<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use Faker\Generator as Faker;

$factory->define(\App\Comment::class, function (Faker $faker) {
    return [
        'video_id' => rand(1, 100),
        'user_id' => rand(1, 100),
        'content' =>$faker->realText(50)
    ];
});
