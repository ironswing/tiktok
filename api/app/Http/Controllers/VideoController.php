<?php

namespace App\Http\Controllers;

use App\Comment;
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

        return response()->customization($comments);
    }

    /**
     * 上传视频接口
     * @return mixed
     */
    public function upload()
    {
        $uploadService = new UploadService("video");

        $data = $uploadService->handle();

        return ["data"=>$data];
    }

    /**
     * 为视频点赞
     * @param $id
     * @return mixed
     */
    public function like($id)
    {
        if (!Auth::check()) {


            return response()->customization([], "请先登录", 400);
        }

        (new Video())->likeThisVideo($id, Auth::id());
    }

    /**
     * 获取视频详情
     * @param $id
     * @return mixed
     */
    public function getDetail($id)
    {

        $data = (new Video())->getThisVideoDetail($id)->toArray();

        if (empty($data)) {

            return response()->customization([], "视频不存在", 400);
        }

        return response()->customization($data);
    }
}
