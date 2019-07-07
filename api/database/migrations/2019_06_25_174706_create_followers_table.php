<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFollowersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('followers')) {
            Schema::create('followers', function (Blueprint $table) {

                $table->increments('id');
                $table->unsignedInteger('user_id')->nullable(false)->comment("用户id");
                $table->unsignedInteger('follower_id')->nullable(false)->comment("粉丝的用户ID");
                $table->unsignedTinyInteger('status')->nullable(false)->default(1)->comment("关注的状态,1关注,2取关");
                $table->timestamps();

                $table->unique("user_id");
                $table->unique(["user_id", "follower_id"]);
            });
        }
        DB::statement("ALTER TABLE followers AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('followers');
    }
}
