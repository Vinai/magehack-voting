magehack-voting
===============
Install:
1) composer update
2) php artisan migrate:refresh
3) php artisan db:seed
4) php artisan config:publish artdarek/oauth-4-laravelphp
5) php artisan clear-compiled
6) php artisan dump-autoload
7) php artisan cache:clear
8) php artisan serve

add

'Github' => array(
            'client_id'     => 'XXXXX',
            'client_secret' => 'XXXXX',
            'scope'         => array(),
        ),

to app/config/packages/artdarek/oauth-4-laravel/config.php
