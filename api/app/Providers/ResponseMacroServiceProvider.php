<?php

namespace App\Providers;

use Illuminate\Support\Facades\Response;
use Illuminate\Support\ServiceProvider;

class ResponseMacroServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // 注意创建Provider后必须加到config/app.php的providers数组中
        Response::macro('customization', function ($value, $msg = "成功", $code = 200) {

            $data = [];
            $data['data'] = $value;
            $data['code'] = $code;
            $data['msg'] = $msg;
            return $data;
        });
    }
}
