<?php

namespace App\Http\Controllers;

use App\Services\CertificateService;
use App\Services\TimeService;
use App\Video;
use Illuminate\Http\Request;
use \Exception;

class PostController extends Controller
{
    /**
     * 发布
     * @param Request $request
     * @param CertificateService $certificateService
     * @param TimeService $timeService
     * @return array
     * @throws Exception
     */
    public function post(Request $request, CertificateService $certificateService, TimeService $timeService)
    {
        $title = $request->input("title");
        $video_url = $request->input("video_url");
        $poster = $request->input("poster");

        if (empty($title) || empty($video_url)) {

            throw new Exception("填写不完整哦~");
        }

        // 检查视频是否存在
        if (!(new Video())->isPathExist($video_url)) {

            throw new Exception("视频已丢失~");
        }

        $user_id = $certificateService->verifyLogin($request);

        $data = [

            "user_id" => $user_id,
            "title" => $title,
            "path" => $video_url,
            'created_at'=>$timeService->getDatetime(),
            'updated_at'=>$timeService->getDatetime()
        ];
        if (!is_null($poster) && !empty($poster)) {

            $data['poster'] = $poster;
        }

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
