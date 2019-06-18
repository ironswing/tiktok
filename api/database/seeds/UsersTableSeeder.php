<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement("ALTER TABLE users AUTO_INCREMENT = 1;");
        factory(\App\User::class, 100)->create()->each(function ($user) {
            $user->save();
        });
    }
}
