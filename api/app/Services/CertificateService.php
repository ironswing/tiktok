<?php

namespace App\Services;

use \Exception;
use Illuminate\Http\Request;

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
     * @return bool
     */
    private function isSessionExist($cookie)
    {
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
     * @return bool
     */
    public function isUserExist($user)
    {

        if (is_null($user) || empty($user)) {

            return false;
        }

        // 还需要判断用户是否被封禁之类的
        if (1 !== intval($user['status'])) {

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
     * @return bool
     * @throws Exception
     */
    public function verifyLogin(Request $request){

        $is_login = $this->isUserLogin($request);
        if (false === $is_login) {

            throw new \Exception("用户未登录");
        }

        return $is_login;
    }
}