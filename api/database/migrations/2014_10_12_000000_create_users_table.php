<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            $table->increments('id');
            $table->string('name',225)->nullable(false)->default("")->comment("用户名");
            $table->string('signature',225)->nullable(false)->default("")->comment("个性签名");
            $table->string('avatar',225)->nullable(false)->default("")->comment("头像");
            $table->unsignedTinyInteger('status')->nullable(false)->default(1)->comment("状态,1:正常,0:删除,2:封禁");
            $table->string('email',225)->nullable(false)->default("")->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable(false)->default("");
            $table->rememberToken();
            $table->timestamps();
        });
        DB::statement("ALTER TABLE users AUTO_INCREMENT = 1;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
