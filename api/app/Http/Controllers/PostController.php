<?php

namespace App\Http\Controllers;

use App\Services\CertificateService;
use App\Video;
use Illuminate\Http\Request;
use \Exception;

class PostController extends Controller
{
    /**
     * 发布
     * @param Request $request
     * @param CertificateService $certificateService
     * @return mixed
     * @throws Exception
     */
    public function post(Request $request, CertificateService $certificateService)
    {
        $title = $request->input("title");
        $video_url = $request->input("video_url");
        $poster = $request->input("poster");
        $cookie = $request->input("cookie");

        if (empty($title) || empty($video_url) || empty($cookie)) {

            throw new Exception("填写不完整哦~");
        }

        // 检查视频是否存在
        if (!(new Video())->isPathExist($video_url)) {

            throw new Exception("视频已丢失~");
        }

        $certificateService->verifyLogin($request);

        $data = [

            "title" => $title,
            "video_url" => $video_url,
            "poster" => $poster,
        ];
        $id = (new Video())->newQuery()->insertGetId($data);

        return [
            "data" => ['id' => $id],
            "msg" => "发布成功~"
        ];
    }

    /**
     * 删除发布的
     * @param Request $request
     * @param CertificateService $certificateService
     * @return array
     * @throws Exception
     */
    public function delete(Request $request, CertificateService $certificateService)
    {

        $id = $request->input("id");

        $user_id = $certificateService->verifyLogin($request);

        $video = new Video();

        if (!$video->isThisVideoBelongToMe($id, $user_id)) {

            throw new Exception("抱歉！您没有权限删除！");
        }

        $video->newQuery()->where(["id" => $id])->update(["status" => 0]);

        return [
            "data" => ["id" => $id],
            "msg" => "删除成功！"
        ];
    }
}
