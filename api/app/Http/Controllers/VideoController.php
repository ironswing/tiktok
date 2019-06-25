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
}
