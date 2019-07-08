<?php

namespace App\Http\Controllers;

use App\Services\CertificateService;
use App\Video;
use Illuminate\Http\Request;

class PostController extends Controller
{

    public function post(Request $request, CertificateService $certificateService)
    {
        $title = $request->input("title");
        $video_url = $request->input("video_url");
        $poster = $request->input("poster");
        $cookie = $request->input("cookie");

        $is_login = $certificateService->isUserLogin($request);
        if (false === $is_login) {

            return response()->customization([], "用户未登录", 400);
        }

        if (empty($title) || empty($video_url) || empty($poster) || empty($cookie)) {

            return response()->customization([], "填写不完整哦~", 400);
        }


        $data = [

            "title" => $title,
            "video_url" => $video_url,
            "poster" => $poster,
        ];
        $id = (new Video())->newQuery()->insertGetId($data);

        return response()->customization(['id' => $id], "发布成功~", 400);
    }
}
