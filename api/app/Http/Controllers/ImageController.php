<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Services\CertificateService;
use App\Services\UploadService;
use App\Video;
use \Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    /**
     * 上传图片接口
     * @return mixed
     */
    public function upload()
    {
        $uploadService = new UploadService("img");

        $data = $uploadService->handle();

        return ["data" => $data];
    }

}
