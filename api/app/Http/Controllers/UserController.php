<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Follower;
use App\User;
use App\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Expr\Array_;


class UserController extends Controller
{

    /**
     * 获取用户的基本资料信息
     * @param $id
     * @return mixed
     */
    public function getProfile($id)
    {
        $id = intval($id);
        $user = (User::where("id", $id)->first());
        if (!$this->isUserExist($user)) {

            return response()->customization([], "用户不存在~", 400);
        }

        return response()->customization($user);
    }

    /**
     * 获取用户的粉丝列表
     * @param $id
     * @return array
     */
    public function getFollowers($id)
    {
        $id = intval($id);

        $followers = (new Follower())->getFollowers($id);

        return response()->customization($followers);
    }

    /**
     * 获取用户的关注列表
     * @param $id
     * @return array
     */
    public function getFollowings($id)
    {
        $id = intval($id);

        $followings = (new Follower())->getFollowings($id);

        return response()->customization($followings);
    }

    /**
     * 获取用户主页的Feed
     * @param $id
     * @return array
     */
    public function getFeeds($id)
    {

        $id = intval($id);

        $feeds = (new Video())->getThisUserAllVideos($id);

        return response()->customization($feeds);
    }

    /**
     * 获取用户的所有评论
     * @param $id
     * @return array
     */
    public function getComments($id)
    {

        $id = intval($id);

        $comments = (new Comment())->getThisUserComments($id);

        return response()->customization($comments);
    }

    /**
     * (取)关注用户
     * @param $id
     * @return Array
     */
    public function follow($id)
    {
        $id = intval($id);

        if (!Auth::check()) {

            return response()->customization([], "请先登录~", 400);
        }

        $status = (new User())->followUser($id);

        return response()->customization([], $status === 1 ? "已关注" : "已取消关注");
    }

    /**
     * 用户是否存在
     * @param $user
     * @return bool
     */
    public function isUserExist($user)
    {

        if (is_null($user) || empty($user)) {

            return false;
        }

        // 还需要判断用户是否被封禁之类的

        return true;
    }
}
