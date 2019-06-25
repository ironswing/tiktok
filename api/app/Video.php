<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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

            return field_replace_created_at($item,"shoot_time");
        });
    }

    public function getFeeds(){

        $feeds = collect($this->newQuery()->where(['status' => 1])->orderByDesc('id')->paginate(10));

        $feeds['data'] = collect($feeds['data'])->map(function ($item) {

            return field_replace_created_at($item,"shoot_time");
        });

        return $feeds;
    }

}
