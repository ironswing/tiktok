<?php

namespace App\Services;

use \Exception;

/**
 * 上传服务
 * Class UploadService
 * @package App\Services
 */
class UploadService
{
    // 最大的一次上传数量
    private $MAX_MULTI_UPLOAD_COUNT = 10;

    // 单个文件的最大大小 / M
    private $IMG_MAX_SIZE = 5;                 // 图片的最大大小
    private $VIDEO_MAX_SIZE = 920;             // 视频的最大大小

    // 文件上传在此目录下
    private $UPLOAD_FILE_DIR = ""; // ( 网络上图片资源形式 , 如 /public/img/ )

    // 支持上传的文件类型数组
    private $FILE_TYPE_SUPPORT = array(

        "img" => array('image/png', 'image/jpg', 'image/jpeg', 'image/gif'),

        "video" => array('video/mp4')
    );

    // 当前上传的文件类型 img/video
    private $UPLOAD_FILE_TYPE = "";
    private $UPLOAD_FILE_TYPE_CHINESE = "";


    function __construct($uploadFileType, $uploadFileDirWeb = "/videos/")
    {
        $this->UPLOAD_FILE_TYPE = $this->checkUploadFileType(strtolower($uploadFileType));

        if ("img" === $this->UPLOAD_FILE_TYPE) {

            $uploadFileDirWeb = "/images/";
        } else if ("video" === $this->UPLOAD_FILE_TYPE) {

            $uploadFileDirWeb = "/videos/";
        }

        $uploadFileDirWeb .= date("Ymd", time());
        $this->UPLOAD_FILE_DIR = $uploadFileDirWeb;
    }

    // 检查上传文件的类型
    public function checkUploadFileType($uploadFileType)
    {

        switch ($uploadFileType) {

            case 'img' :

                $this->UPLOAD_FILE_TYPE_CHINESE = "图片";
                return "img";
                break;

            case 'video' :

                $this->UPLOAD_FILE_TYPE_CHINESE = "视频";
                return "video";
                break;

            default :

                throw new Exception("上传的文件类型不合法");
                break;
        }

    }

    // 上传操作
    public function doUploadBS()
    {

        // 返回的数组
        $data = array();

        // 循环 FILES 数组 , 获取每一个文件的信息
        $file_name = array();       // 文件名字
        $file_tmpname = array();       // 文件的临时名字(临时路径)

        $file_type = array();       // 文件类型
        $file_size = array();       // 文件大小

        $file_errorcode = array();     // 文件的错误代码

        $i = -1;
        foreach ($_FILES as $key => $value) {

            ++$i;

            $file_name[$i] = $_FILES[$key]["name"];       // 获取文件的 名字

            $file_type[$i] = $_FILES[$key]["type"];       // 获取文件的 类型

            $file_tmpname[$i] = $_FILES[$key]['tmp_name'];   // 获取文件的 临时名字

            $file_size[$i] = $_FILES[$key]['size'];       // 获取文件的 大小

            $file_errorcode[$i] = $_FILES[$key]['error'];      // 或我文件的 错误信息

        }

        // 循环上传的这些文件,只要有一个文件上传错误就失败
        $count = $i;
        for ($i = 0; $i <= $count; ++$i) {

            if ($file_errorcode[$i] !== 0) {

                // 上传失败
                throw new Exception("上传" . $this->UPLOAD_FILE_TYPE_CHINESE . "失败( 第" . ($i + 1) . "个 )");
            }
        }

        // 判断文件的大小
        if ($this->UPLOAD_FILE_TYPE === 'img') {

            $temp_file_max_size = $this->IMG_MAX_SIZE;
        } else if ($this->UPLOAD_FILE_TYPE === 'video') {

            $temp_file_max_size = $this->VIDEO_MAX_SIZE;
        } else {

            throw new Exception("上传的文件类型不合法");
        }
        for ($i = 0; $i <= $count; ++$i) {


            if (($file_size[$i] / 1024 / 1024) > $temp_file_max_size) {


                // 文件大小超出最大值
                throw new Exception($this->UPLOAD_FILE_TYPE_CHINESE . "大小超过范围");
            }
        }

        // 依次修改文件的名字
        for ($i = 0; $i <= $count; ++$i) {

            $file_name[$i] = md5(time() . mt_rand(-9999, 99999));

            // 不支持的文件类型
            if (!in_array($file_type[$i], $this->FILE_TYPE_SUPPORT[$this->UPLOAD_FILE_TYPE], true)) {

                throw new Exception($this->UPLOAD_FILE_TYPE_CHINESE . "的类型错误(第" . ($i + 1) . "个)");
            }

            $type = explode("/", $file_type[$i])[1];
            $file_name[$i] = $file_name[$i] . "." . $type;


            // 返回的数据信息
            $data[$this->UPLOAD_FILE_TYPE][$i]['url'] = $this->UPLOAD_FILE_DIR . $file_name[$i];

        }

        // 依次移动文件
        $storage_path = app_path() . "../storage/app/public/";
        for ($i = 0; $i <= $count; ++$i) {

            move_uploaded_file($file_tmpname[$i], $storage_path . $this->UPLOAD_FILE_DIR . $file_name[$i]);
        }

        return $data;

    }

    // Laravel 支持依赖注入, 因此, Service之间可以相互依赖(拒绝deadlock)
    // 在Controller中注入Service即可
    public function handle()
    {

        return $this->doUploadBS();
    }

}