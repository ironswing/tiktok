<?php

namespace App;

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

    protected $hidden = ["id", "user_id", "status", "updated_at"];

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

    public function getThisVideoDetail($id)
    {

        return $this->newQuery()->where(['id' => $id, 'status' => 1])->get();
    }

    public function likeThisVideo($id, $user_id)
    {

        $record = $this->newQuery()->where(['user_id' => $user_id, 'video_id' => $id])->get();

        if (1 == $record['status']) {

            DB::table("thumbs")->where(['id' => $record['id']])->update(['status' => 0]);
        } else {

            DB::table("thumbs")->where(['id' => $record['id']])->update(['status' => 1]);
        }
    }
}
