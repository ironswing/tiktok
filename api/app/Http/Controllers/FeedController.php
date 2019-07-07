<?php

namespace App\Http\Controllers;

use App\Video;
use Illuminate\Http\Request;

class FeedController extends Controller
{

    public function getFeeds()
    {
        $feeds = (new Video())->getFeeds();

        $feeds = array_merge($feeds, ['csrf_token' => csrf_token()]);

        return response()->customization($feeds);
    }
}
