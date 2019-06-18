<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('comments')) {

            Schema::create('comments', function (Blueprint $table) {

                $table->increments('id');
                $table->unsignedInteger('video_id')->comment("视频id");
                $table->unsignedBigInteger('user_id')->comment("评论的用户id");
                $table->string('content', 250)->default("")->comment("评论内容");
                $table->timestamps();

                $table->index("video_id");
                $table->index("user_id");
            });

            DB::statement("ALTER TABLE comments AUTO_INCREMENT = 1;");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
