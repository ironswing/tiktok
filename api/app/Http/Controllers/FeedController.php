<?php

namespace App\Http\Controllers;

use App\Video;
use Illuminate\Http\Request;

class FeedController extends Controller
{

    public function getFeeds()
    {
        $feeds = (new Video())->getFeeds();

        return [
            "data" => $feeds,
        ];
    }
}
