<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Services\CertificateService;
use App\Services\UploadService;
use App\Video;
use App\User;
use \Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VideoController extends Controller
{
    /**
     * 获取视频的下面评论
     * @param $id
     * @return array
     * @throws Exception
     */
    public function getComments($id)
    {
        $id = intval($id);

        // 判断此视频是否存在
        if (!(new Video())->isIdExist($id)) {
            throw new Exception("视频不存在~");
        }

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
     * @param Request $request
     * @param CertificateService $certificateService
     * @return array
     * @throws Exception
     */
    public function getDetail($id, Request $request, CertificateService $certificateService)
    {

        $data = collect((new Video())->getThisVideoDetail($id))->toArray();
        if (empty($data)) {

            throw new Exception("视频不存在");
        }

        $data['user_profile'] = User::where("id", $data['user_id'])->first();

        // 获取用户的点赞状态
        $user_id = $certificateService->verifyLogin($request, false);
        if ($user_id < 1) {

            $data['is_thumb'] = 0;
        } else {

            $data['is_thumb'] = ((new Video())->isLikeThisVideo($id, $user_id)) ? 1 : 0;
        }

        return ["data" => $data];
    }
}
