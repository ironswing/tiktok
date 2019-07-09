<?php

use Illuminate\Database\Seeder;

class FollowerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("ALTER TABLE videos AUTO_INCREMENT = 1;");
        factory(\App\Follower::class, 100)->create()->each(function ($follower) {
            $follower->save();
        });
    }
}
