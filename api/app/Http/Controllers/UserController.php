<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Follower;
use App\PasswordReset;
use App\Services\CertificateService;
use App\User;
use App\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\PasswordReset as PasswordResetMailable;
use \Exception;

class UserController extends Controller
{

    /**
     * 获取用户的基本资料信息
     * @param $id
     * @return array
     * @throws Exception
     */
    public function getProfile($id)
    {
        $id = intval($id);
        $user = (new User())->newQuery()->where("id", $id)->first();
        if (!(new CertificateService())->isUserExist(($user))) {

            throw new Exception("用户不存在~");
        }

        return ["data" => $user];
    }

    /**
     * 获取用户的粉丝列表
     * @param $id
     * @return array
     */
    public function getFollowers($id)
    {
        $user_id = intval($id);

        $followers = (new Follower())->getFollowers($user_id);

        return ["data" => $followers];
    }

    /**
     * 获取用户的关注列表
     * @param $id
     * @return array
     */
    public function getFollowings($id)
    {
        $user_id = intval($id);

        $followings = (new Follower())->getFollowings($user_id);

        return ["data" => $followings];
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

        return ["data" => $feeds];
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

        return ["data" => $comments];
    }

    /**
     * (取)关注用户
     * @param $id
     * @param Request $request
     * @param CertificateService $certificateService
     * @return mixed
     * @throws Exception
     */
    public function follow($id, Request $request, CertificateService $certificateService)
    {
        $id = intval($id);

        $certificateService->verifyLogin($request);

        $status = (new User())->newQuery()->followUser($id);

        return [
            "msg" => $status === 1 ? "已关注" : "已取消关注"
        ];
    }

    /**
     * 判断用户是否登录
     * @param Request $request
     * @param CertificateService $certificateService
     * @return mixed
     * @throws Exception
     */
    public function isLogin(Request $request, CertificateService $certificateService)
    {
        $is_login = $certificateService->isUserLogin($request);

        if (false !== $is_login) {

            return ["data" => ["id" => $is_login]];
        }

        throw new Exception("用户未登录");
    }

    /**
     * 登录
     * @param Request $request
     * @return mixed
     * @throws Exception
     */
    public function login(Request $request)
    {
        $name = $request->input("name");
        $password = $request->input("password");

        if (empty($name) || empty($password)) {

            throw new Exception("参数不能为空哦~");
        }

        // 匹配是否存在这个用户
        $user = (new User())->newQuery()->where(["name" => $name, "password" => $password])->get()->toArray();
        if (empty($user)) {

            throw new Exception("用户名或密码错误");
        }
        if (isset($user[0])) {

            $user = $user[0];
        }

        if(!isset($_SESSION)){

            session_start();
        }
        $user_id = $user['id'];
        $cookie = md5(time() . $name . $password . mt_rand(-9999, 9999));
        $_SESSION[$cookie] = $user_id;

        return ["data" => ['id' => $user_id, 'cookie' => $cookie, 'session_id'=>session_id()]];
    }

    /**
     * 注册
     * @param Request $request
     * @return mixed
     * @throws Exception
     */
    public function register(Request $request)
    {
        $name = $request->input("name");
        $email = $request->input("email");
        $password = $request->input("password");
        $confirm_password = $request->input("confirm_password");

        if (empty($name) || empty($email) || empty($email) || empty($password) || empty($confirm_password)) {

            throw new Exception("参数不能为空哦~");
        }

        if ($confirm_password !== $password) {

            throw new Exception("两次输入密码不一致");
        }

        // 判断邮箱是否已存在
        $user = (new User())->newQuery()->where(["email" => $email])->get()->toArray();
        if (!empty($user)) {

            throw new Exception("邮箱已存在");
        }

        $user = [

            "name" => $name,
            "email" => $email,
            "password" => $password,
        ];
        $user_id = (new User())->newQuery()->insertGetId($user);

        return ["data" => ['id' => $user_id]];
    }

    /**
     * 忘记密码接口
     * @param Request $request
     * @param CertificateService $certificateService
     */
    public function forgetPassword(Request $request, CertificateService $certificateService)
    {
        $email = $request->input("email");
        $token = $certificateService->generateToken();

        $data = [
            'email' => $email,
            'token' => $token,
        ];
        (new PasswordReset())->newQuery()->updateOrInsert(['email' => $email], $data);

        // 发邮件
        Mail::to($request->user())->send((new PasswordResetMailable()));
    }

    /**
     * 重置密码
     * @param Request $request
     * @throws Exception
     */
    public function resetPassword(Request $request)
    {

        $email = $request->input("email");
        $password = $request->input("password");
        $confirm_password = $request->input("confirm_password");

        if ($confirm_password !== $password) {

            throw new Exception("两次输入密码不一致");
        }

        (new User())->newQuery()->where(["email" => $email])->update(["password" => $password]);
    }
}
