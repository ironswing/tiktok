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

//Route::get('/', function () {
//    return view('welcome');
//});
Auth::routes();

// Root 路由
Route::redirect('/', '/home');

// home 路由 - 注[ name() : 路由命名 ]
Route::get('/home', 'HomeController@index')->name('home');

// user 路由
Route::get('user/{id}', function ($id) {

    return (new \App\Http\Controllers\API\UserController())->index($id);
})->where('id', '[0-9]+');

// comment 路由
Route::resource('comment', 'API\CommentController');

// 用户资料
// 别加前缀 : API\UserController@getProfile, 这样是错误的 !
Route::get('/user/{id}/profile', 'UserController@getProfile');

// 获取粉丝列表和关注列表
Route::get('/user/{id}/followers', 'UserController@getFollowers');
Route::get('/user/{id}/followings', 'UserController@getFollowings');

// 获取用户的Feed流
Route::get('/user/{id}/feeds', 'UserController@getFeeds');


