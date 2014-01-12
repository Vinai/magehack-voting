<?php

class ProjectsTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('projects')->truncate();

		$projects = array(
            array(
                'title' => 'Test Project',
                'description' => 'Example project description for a project idea',
                'user_id' => 1,
                'hangout_url' => '',
                'created_at' => '2014-01-12 00:00:00',
                'updated_at' => '2014-01-12 00:00:00',

            ),
            array(
                'title' => 'Example Project',
                'description' => 'Example project description for a project idea',
                'user_id' => 1,
                'hangout_url' => '',
                'created_at' => '2014-01-12 00:00:00',
                'updated_at' => '2014-01-12 00:00:00',

            )
		);

		// Uncomment the below to run the seeder
		DB::table('projects')->insert($projects);
	}

}
