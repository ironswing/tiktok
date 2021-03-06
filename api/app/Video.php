<?php

namespace App;

use App\Services\TimeService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

/**
 * App\Video
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Video query()
 * @mixin \Eloquent
 */
class Video extends Model
{
    protected $table = 'videos';

    protected $hidden = [ "status", "updated_at"];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    public function getThisUserAllVideos($id)
    {
        $followers = $this->newQuery()->where(['user_id' => $id, 'status' => 1])
            ->get();

        return $followers->map(function ($item) {

            return field_replace_created_at($item, "shoot_time");
        });
    }

    public function getFeeds()
    {

        $feeds = collect($this->newQuery()->where(['status' => 1])->orderByDesc('id')->paginate(10));

        $feeds['data'] = collect($feeds['data'])->map(function ($item) {

            return field_replace_created_at($item, "shoot_time");
        });

        return $feeds;
    }

    /**
     * 判断视频是否存在(根据路径)
     * @param $path
     * @return bool
     */
    public function isPathExist($path)
    {
        $storage_path = app_path() . "/../storage/app/public/";

        $path = $storage_path . $path;

        if (!File::exists($path)) {

            return false;
        }

        return true;
    }

    /**
     * 判断视频是否存在(根据id)
     * @param $id
     * @return bool
     */
    public function isIdExist($id)
    {
        return !empty($this->newQuery()->where(["id" => $id, "status" => 1])->first()->toArray());
    }

    public function getThisVideoDetail($id)
    {
        return $this->newQuery()->where(['id' => $id, 'status' => 1])->first();
    }

    public function likeThisVideo($video_id, $user_id)
    {
        $record = collect((new Thumb())->newQuery()->where(['user_id' => $user_id, 'video_id' => $video_id])->first())->toArray();
        if (isset($record[0])) {

            $record = $record[0];
        }

        $timeService = new TimeService();

        if (empty($record)) {

            $data = [
                'user_id' => $user_id, 'video_id' => $video_id,
                "created_at" => $timeService->getDatetime(),
                "updated_at" => $timeService->getDatetime()
            ];
            DB::table("thumbs")->insert($data);
            return;
        }

        if (1 == $record['status']) {

            DB::table("thumbs")->where(['id' => $record['id']])->update(['status' => 0]);
            DB::table("videos")->where(['id' => $video_id])->decrement("thumbs");
        } else {

            DB::table("thumbs")->where(['id' => $record['id']])->update(['status' => 1]);
            DB::table("videos")->where(['id' => $video_id])->increment("thumbs");
        }
    }

    /**
     * 这个视频是否是属于我的
     * @param $id
     * @param $user_id
     * @return bool
     */
    public function isThisVideoBelongToMe($id, $user_id)
    {
        $video = (new Video())->newQuery()->where(['id' => $id])->first();
        if (isset($video[0])) {

            $video = $video[0];
        }

        return intval($video['user_id']) === intval($user_id);
    }

    /**
     * 是否给此视频点过赞
     * @param $video_id
     * @param $user_id
     * @return bool
     */
    public function isLikeThisVideo($video_id, $user_id)
    {
        $record = collect(DB::table("thumbs")->where(["user_id" => $user_id, "video_id" => $video_id])->first())->toArray();

        if(isset($record[0])){

            $record = $record[0];
        }

        if(empty($record)){

            return false;
        }

        return intval($record['status']) === 1;
    }
}
