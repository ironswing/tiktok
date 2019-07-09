<?php

namespace App\Http\Controllers;

use \Exception;
use App\Comment;
use App\Video;
use App\Services\CertificateService;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    /**
     * 发表评论
     * @param Request $request
     * @param CertificateService $certificateService
     * @throws Exception
     * @return array
     */
    public function add(Request $request, CertificateService $certificateService)
    {
        $user_id = $certificateService->verifyLogin($request);

        // video_id 参数 和 content 参数
        $video_id = $request->input("video_id");
        $content = trim($request->input("content"));

        if (empty($video_id) || empty($content)) {

            throw new Exception("填写不完整！");
        }

        if (!(new Video())->isIdExist($video_id)) {

            throw new Exception("视频不存在");
        }

        $id = (new Comment())->addMyComment($video_id, $user_id, $content);

        return ["data" => ["id" => $id]];
    }
}
