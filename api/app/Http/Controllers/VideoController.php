<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Video;
use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function getComments($id){

        $id = intval($id);

        $comments = (new Comment())->getThisVideoComments($id);

        return response()->customization($comments);
    }

    /**
     * 添加一个个人视频
     */
    public function add(){

    }

    /**
     * 删除一个视频
     */
    public function delete(){

    }
}
