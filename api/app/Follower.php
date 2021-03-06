<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    protected $table = 'followers';

    protected $visible = ['user_id', 'following_id', 'follower_id', 'name', 'signature', 'avatar', 'follow_time', 'status'];

    public function getFollowers($id)
    {
        $followers = $this->newQuery()->where(['user_id' => $id, 'followers.status' => 1])
            ->join("users", "follower_id", "users.id")
            ->get();

        return $followers->map(function ($item) {

            $item['follow_time'] = date("Y-m-d H:i:s", strtotime($item['created_at']));
            return $item;
        });
    }

    public function getFollowings($id)
    {
        $followers = $this->newQuery()->where(['follower_id' => $id, 'followers.status' => 1])
            ->join("users", "followers.user_id", "users.id")
            ->get();

        return $followers->map(function ($item) {

            $item['following_id'] = $item['user_id'];
            $item['follow_time'] = date("Y-m-d H:i:s", strtotime($item['created_at']));
            unset($item['follower_id']);
            return $item;
        });
    }
}
