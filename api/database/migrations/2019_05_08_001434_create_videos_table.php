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
                $table->unsignedInteger('user_id')->comment("视频的用户id");
                $table->string('title', 250)->default("")->comment("视频的标题");
                $table->string('path', 250)->default("")->comment("视频的路径");
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
