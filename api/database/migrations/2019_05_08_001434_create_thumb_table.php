<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateThumbTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('thumbs')) {

            Schema::create('thumbs', function (Blueprint $table) {

                $table->increments('id');
                $table->unsignedInteger('user_id')->nullable(false)->comment("点赞的用户ID");
                $table->string('video_id', 250)->nullable(false)->default("")->comment("视频的ID");
                $table->unsignedTinyInteger('status')->nullable(false)->default(1)->comment("状态,1:点赞,0:取消点赞");
                $table->timestamps();

                $table->index("user_id");
            });

            DB::statement("ALTER TABLE videos AUTO_INCREMENT = 1;");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('videos');
    }
}
