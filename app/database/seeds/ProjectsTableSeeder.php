<?php

class ProjectsTableSeeder extends Seeder {

	public function run()
	{
		// Uncomment the below to wipe the table clean before populating
		// DB::table('projects')->truncate();

		$projects = array(
            array(
                'title' => 'Implement Module for prediction.io',
                'description' => 'There is a service called http://prediction.io/ which targets on predicting user behaviors. Could be very interesting for recommendation backend',
                'user_id' => 1,
                'hangout_url' => '',
                'created_at' => '2014-01-12 00:00:00',
                'updated_at' => '2014-01-12 00:00:00',

            ),
            array(
                'title' => 'Real Big Sample Data',
                'description' => 'Mainly for performanc research I would like to have a real real big dataset which covers all imaginably performance edge cases. some of them are: * many many categories whith more then 5 levels of depth. lets say 1k+ categories * configurable products with several options ( in the end 1 configurable = 10k+ simples {20×10×4×6×3}) * multiple websites/stores/storeviews ( should end in 1k storeviews ) Its ok(and suggested) if it ends in a script, which randomly creates this into files readable by an Importer, as this would speed up the generation and the importer can care in the end of optimize the saving to magento.',
                'user_id' => 1,
                'hangout_url' => '',
                'created_at' => '2014-01-12 00:00:00',
                'updated_at' => '2014-01-12 00:00:00',

            ),
            array(
                'title' => 'Shipping rates grid in Magento',
                'description' => 'I think it would be nice to have something like this https://github.com/thebod/Thebod_Shippingrates in magento, this modfication of Magento will allow nice and easy managment of shipping rates out of magento box.',
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
