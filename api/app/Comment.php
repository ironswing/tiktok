<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Comment
 *
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Comment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Comment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Comment query()
 * @mixin \Eloquent
 */
class Comment extends Model
{
    protected $table = 'comments';

    protected $hidden = ["id", "video_id", "updated_at", "comment_time"];

    /**
     * 获取某个视频下的所有评论
     * @param $id
     * @return array
     */
    public function getThisVideoComments($id)
    {
        $comments = collect($this->newQuery()->where(['video_id' => $id, 'status' => 1])
            ->paginate(10));

        $comments['data'] = collect($comments['data'])->map(function ($item) {

            $item['user_profile'] = User::where("id", $item['user_id'])->first();

            $item['comment_time'] = date("Y-m-d H:i:s", strtotime($item['created_at']));
            unset($item['created_at']);
            return $item;
        });

        return $comments;
    }

    /**
     * 获取某个用户的所有评论
     * @param $id
     * @return array
     */
    public function getThisUserComments($id){

        $comments = collect($this->newQuery()->where(['user_id' => $id, 'status' => 1])
            ->paginate(10));

        $comments['data'] = collect($comments['data'])->map(function ($item) {

            $item['comment_time'] = date("Y-m-d H:i:s", strtotime($item['created_at']));
            unset($item['created_at']);
            return $item;
        });

        return $comments;
    }

    /**
     * 添加一条评论
     */
    public function add(){

    }

    /**
     * 删除一条评论
     * @param $id
     * @return bool|void|null
     */
    public function delete($id){

    }
}
