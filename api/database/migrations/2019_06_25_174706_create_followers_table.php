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
        Schema::create('followers', function (Blueprint $table) {

            $table->increments('id');
            $table->unsignedInteger('user_id')->comment("用户id");
            $table->unsignedInteger('follower_id')->default(0)->comment("粉丝的用户ID");
            $table->unsignedTinyInteger('status')->default(1)->comment("关注的状态");
            $table->timestamps();

            $table->unique("user_id");
            $table->unique(["user_id","follower_id"]);
        });
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
