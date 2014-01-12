<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddGithubFieldsToUserTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('users', function(Blueprint $table) {
			$table->string('avata_url')->default('');
            $table->string('github_accesstoken')->default('');
            $table->string('github_username')->default('');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('users', function(Blueprint $table) {
            $table->removeColumn('avata_url');
            $table->removeColumn('github_accesstoken');
            $table->removeColumn('github_username');
		});
	}

}
