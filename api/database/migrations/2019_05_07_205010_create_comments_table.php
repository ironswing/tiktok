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
                $table->unsignedInteger('video_id')->nullable(false)->comment("视频id");
                $table->unsignedBigInteger('user_id')->nullable(false)->comment("评论的用户id");
                $table->unsignedBigInteger('reply_comment_id')->nullable(false)->default(0)->comment("回复的评论ID,0表示非回复");
                $table->string('content', 250)->nullable(false)->default("")->comment("评论内容");
                $table->unsignedTinyInteger('status')->nullable(false)->default(1)->comment("状态,1:正常,0:删除");
                $table->timestamps();

                $table->index("video_id");
                $table->index("user_id");
                $table->index("reply_comment_id");
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
