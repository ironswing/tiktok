<?php

namespace App;

use App\Services\TimeService;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


/**
 * App\User
 *
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User query()
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'email_verified_at', 'created_at', 'updated_at'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * 关注(取消关注)某个用户
     * @param $user_id
     * @param $my_id
     * @return bool|int|mixed
     */
    public function followUser($user_id, $my_id)
    {

        $record = collect((new Follower())->newQuery()->where(["user_id" => $user_id, "follower_id" => $my_id])->first())->toArray();
        if (isset($record[0])) {

            $record = $record[0];
        }

        $timeService = new TimeService();

        if (empty($record)) {

            $data = [
                'user_id' => $user_id, 'follower_id' => $my_id,
                "created_at" => $timeService->getDatetime(),
                "updated_at" => $timeService->getDatetime()
            ];
            DB::table("followers")->insert($data);
            return 1;
        }

        $cond = ["user_id" => $user_id, "follower_id" => $my_id];
        if (1 == $record['status']) {

            DB::table("followers")->where($cond)->update(['status' => 0]);
        } else {

            DB::table("followers")->where($cond)->update(['status' => 1]);
        }

        return $record['status'];
    }

}
