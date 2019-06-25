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

    protected $hidden = ["id", "user_id", "status", "created_at", "updated_at"];

    public function getThisUserAllVideos($id)
    {
        $followers = $this->newQuery()->where(['user_id' => $id, 'status' => 1])
            ->get();

        return $followers->map(function ($item) {

            $item['shoot_time'] = date("Y-m-d H:i:s", strtotime($item['created_at']));
            return $item;
        });

    }
}
