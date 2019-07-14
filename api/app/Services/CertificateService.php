<?php

namespace App\Services;

use \Exception;
use Illuminate\Http\Request;
use App\User;

/**
 * 用户凭证服务
 * Class CertificateService
 * @package App\Services
 */
class CertificateService
{
    /**
     * 是否存在Session
     * @param $cookie
     * @return bool | integer
     */
    private function isSessionExist($cookie)
    {
        if (!isset($_SESSION)) {

            session_start();
        }

        if (empty($cookie)) {

            return false;
        }

        if (isset($_SESSION[$cookie])) {

            // 存储的是这个用户的ID
            return $_SESSION[$cookie];
        }
        return false;
    }

    /**
     * 用户是否存在
     * @param $user
     * @param bool $throw_error
     * @return bool
     * @throws Exception
     */
    public function isUserExist($user, $throw_error = true)
    {
        // 还需要判断用户是否被封禁之类的
        if (is_null($user) || empty($user) || 1 !== intval($user['status'])) {

            if ($throw_error) {

                throw new \Exception("用户不存在");
            }

            return false;
        }

        return true;
    }

    /**
     * 判断用户是否登录
     * @param Request $request
     * @return bool
     */
    public function isUserLogin(Request $request)
    {

        $cookie = $request->input("cookie");
        $is_login = $this->isSessionExist($cookie);

        return $is_login;
    }

    /**
     * 生成token
     * @return string
     */
    public function generateToken()
    {
        return md5(md5(time() . microtime() . mt_rand(-99999, 99999)));
    }

    /**
     * 验证登录
     * @param Request $request
     * @param bool $throw_error
     * @return bool
     * @throws Exception
     */
    public function verifyLogin(Request $request, $throw_error = true)
    {
        $is_login = $this->isUserLogin($request);
        if (false === $is_login) {

            if (!$throw_error) {

                return 0;
            }
            throw new \Exception("用户未登录");
        }

        // 再验证一下这个用户是否存在
        $user = (new User())->newQuery()->where("id", $is_login)->first();
        $this->isUserExist($user);

        return $is_login;
    }
}