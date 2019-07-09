<?php

namespace App\Services;

use \Exception;
use Illuminate\Http\Request;

/**
 * 时间服务
 * Class TimeService
 * @package App\Services
 */
class TimeService
{

    public function getDatetime(){

        return date("Y-m-d H:i:s",time());
    }
}