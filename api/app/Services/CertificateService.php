<?php

namespace App\Services;

use \Exception;

/**
 * 用户凭证服务
 * Class CertificateService
 * @package App\Services
 */
class CertificateService
{

    public function isSessionExist($cookie){

        if(isset($_SESSION[$cookie])){

            return $_SESSION[$cookie];
        }
        return false;
    }
}