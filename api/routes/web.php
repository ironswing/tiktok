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

// Auth::routes();


/*----------------------------------------------------------------
| APP相关接口
|----------------------------------------------------------------*/

// 获取APP的Feed流
Route::redirect('/', '/feeds');
Route::redirect('/home', '/feeds');
Route::get('/feeds', 'FeedController@getFeeds');

// 登录接口
Route::post('/login','UserController@login');

// 注册接口
Route::post('/register','UserController@register');

// 发布接口
Route::post('/post', 'PostController@post');


/*----------------------------------------------------------------
| 视频相关接口
|----------------------------------------------------------------*/

// 获取视频下的所有评论
Route::get('/video/{id}/comments', 'VideoController@getComments');
Route::get('/video/{id}/detail', 'VideoController@getDetail');

// 视频点赞接口
Route::post('/video/{id}/like', 'VideoController@like');

// 视频删除接口
Route::get('/video/{id}/delete', 'VideoController@delete');

// 视频上传接口
Route::post('/video/upload', 'VideoController@upload');

// 图片上传接口
Route::post('/image/upload', 'ImageController@upload');


/*----------------------------------------------------------------
| 用户相关接口
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

// (取)关注接口
Route::post('/user/{id}/follow', 'UserController@follow');

// 用户是否已登录
Route::get('/user/is_login','UserController@isLogin');

// 修改资料信息
Route::post('/user/profile/edit', 'UserController@editProfile');

// 更新背景墙
Route::post('/user/background/edit', 'UserController@updateBackground');


/*----------------------------------------------------------------
| 评论相关接口
|----------------------------------------------------------------*/

// 获取某条评论的回复
Route::get('/comment/{id}/replies', 'CommentController@getReplies');

// 评论接口
Route::post('/comment/add', 'CommentController@add');

/*
 * 便签
 */
Route::post('/note/add', 'NoteController@addNote');

Route::get('/note/list', 'NoteController@getNotes');

Route::get('/note/{id}/delete', 'NoteController@deleteNoteById');

Route::get('/note/{id}/detail', 'NoteController@getDetail');


/*----------------------------------------------------------------
| 测试相关接口
|----------------------------------------------------------------*/

// 测试 cookie
Route::get('/test/test_cookie','TestController@testCookie');

