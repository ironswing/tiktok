<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use Faker\Generator as Faker;

$factory->define(\App\Video::class, function (Faker $faker) {
    $user_id = rand(1, 100);
    return [
        'user_id' => $user_id,
        'title' => $faker->realText(50),
        'path' => "/videos/user_{$user_id}/" . md5($faker->realText(50)) . ".mp4",
    ];
});
