<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Auth::routes();


/*----------------------------------------------------------------
| 打开APP, 开始刷视频 | Feed相关接口
|----------------------------------------------------------------*/

// 获取APP的Feed流
Route::redirect('/', '/feeds');
Route::redirect('/home', '/feeds');
Route::get('/feeds', 'FeedController@getFeeds');


/*----------------------------------------------------------------
| 打开某一个视频 | 视频相关接口
|----------------------------------------------------------------*/

// 获取视频下的所有评论
Route::get('/video/{id}/comments', 'VideoController@getComments');
Route::get('/video/{id}/detail', 'VideoController@getDetail');

// 获取某条评论的回复
Route::get('/comment/{id}/replies', 'CommentController@getReplies');


/*----------------------------------------------------------------
| 打开作者的首页 | 用户相关接口
|----------------------------------------------------------------*/

// 用户资料
// 别加前缀 : API\UserController@getProfile, 这样是错误的 !
Route::get('/user/{id}/profile', 'UserController@getProfile');

// 获取粉丝列表和关注列表
Route::get('/user/{id}/followers', 'UserController@getFollowers');
Route::get('/user/{id}/followings', 'UserController@getFollowings');

// 获取用户的Feed流
Route::get('/user/{id}/feeds', 'UserController@getFeeds');


// 获取用户发布过的历史评论
Route::get('/user/{id}/comments', 'UserController@getComments');









