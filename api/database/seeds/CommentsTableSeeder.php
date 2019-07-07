<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*DB::table('comments')->insert([
            'video_id' => rand(1, 100),
            'user_id' => rand(1,100),
            'content' => \Illuminate\Support\Str::random(50)
        ]);*/

        DB::statement("ALTER TABLE comments AUTO_INCREMENT = 1;");
        factory(\App\Comment::class, 100)->create()->each(function ($comment) {
            $comment->save();
        });
    }
}
