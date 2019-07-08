<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVideosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('videos')) {

            Schema::create('videos', function (Blueprint $table) {

                $table->increments('id');
                $table->unsignedInteger('user_id')->nullable(false)->comment("视频的用户id");
                $table->string('title', 250)->nullable(false)->default("")->comment("视频的标题");
                $table->string('path', 250)->nullable(false)->default("")->comment("视频的路径");
                $table->string('poster', 250)->nullable(false)->default("default.poster.jpg")->comment("视频的封面");
                $table->unsignedTinyInteger('status')->nullable(false)->default(1)->comment("状态,1:正常,0:删除");
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
