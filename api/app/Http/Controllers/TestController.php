<?php

namespace App\Http\Controllers;

use App\Services\CertificateService;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function testCookie(Request $request, CertificateService $certificateService)
    {
        $is_login = $certificateService->isUserLogin($request);

        $cookie = $request->input("cookie");

        return [
            "data" => [
                'is_login' => $is_login ? $is_login : 0,
                'cookie' => $cookie,
                'is_index_exist' => isset($_SESSION[$cookie])?1:0
            ],
        ];
    }
}
