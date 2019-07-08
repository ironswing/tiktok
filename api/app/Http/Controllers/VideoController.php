<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Services\CertificateService;
use App\Services\UploadService;
use App\Video;
use \Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoController extends Controller
{
    public function getComments($id)
    {
        $id = intval($id);

        $comments = (new Comment())->getThisVideoComments($id);

        return ["data" => $comments];
    }

    /**
     * 上传视频接口
     * @return mixed
     */
    public function upload()
    {
        $uploadService = new UploadService("video");

        $data = $uploadService->handle();

        return ["data" => $data];
    }

    /**
     * 为视频点赞
     * @param $id
     * @param Request $request
     * @param CertificateService $certificateService
     * @throws Exception
     */
    public function like($id, Request $request, CertificateService $certificateService)
    {
        $user_id = $certificateService->verifyLogin($request);

        (new Video())->likeThisVideo($id, $user_id);
    }

    /**
     * 获取视频详情
     * @param $id
     * @return array
     * @throws Exception
     */
    public function getDetail($id)
    {

        $data = (new Video())->getThisVideoDetail($id)->toArray();

        if (empty($data)) {

            throw new Exception("视频不存在");
        }

        return ["data" => $data];
    }
}
