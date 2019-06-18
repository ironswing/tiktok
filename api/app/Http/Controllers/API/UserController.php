<?php

namespace App\Http\Controllers\API;

use App\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function index($user_id)
    {
        $model_video = new Video();
        return response()->json([
            'id'=>$user_id,

            'videos'=> Video::where(['user_id'=>$user_id])->get(),

        ]);
    }
}
