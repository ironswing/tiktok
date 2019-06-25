<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Follower::class, function (Faker $faker) {
    $user_id = rand(1, 100);
    $follower_id = rand(1, 100);
    return [
        'user_id' => $user_id,
        'follower_id' => $follower_id
    ];
});
