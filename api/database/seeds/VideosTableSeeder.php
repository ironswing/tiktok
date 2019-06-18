<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VideosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("ALTER TABLE videos AUTO_INCREMENT = 1;");
        factory(\App\Video::class, 100)->create()->each(function ($video) {
            $video->save();
        });
    }
}
