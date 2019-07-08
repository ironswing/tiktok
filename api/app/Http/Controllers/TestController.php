<?php

namespace App\Http\Controllers;

use App\Services\CertificateService;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function testCookie(Request $request, CertificateService $certificateService)
    {
        $is_login = $certificateService->isUserLogin($request);

        return [
            "data"=>['is_login' => $is_login ? $is_login : 0],
        ];
    }
}
