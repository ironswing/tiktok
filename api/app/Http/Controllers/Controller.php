<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    public function callAction($method, $parameters)
    {
        try {

            $data = call_user_func_array([$this, $method], $parameters);

        } catch (\Exception $exception) {

            $codes = [];

            $code = $exception->getCode();

            if (!in_array($code, $codes)) {

                $code = 400;
            }

            return response()->customization([], $exception->getMessage(), $code);
        }

        if (is_null($data) || empty($data)) {

            $data = [];
        }

        $data['data'] = isset($data['data']) ? $data['data'] : [];
        $data['msg'] = isset($data['msg']) ? $data['msg'] : "成功";

        return response()->customization($data['data'], $data['msg'], 200);
    }
}
