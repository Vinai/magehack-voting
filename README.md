magehack-voting
===============

How to run the app:
 
 - composer update
 - php artisan config:publish artdarek/oauth-4-laravel
 - php artisan migrate:refresh
 - php artisan db:seed
 - php artisan serve

You will need php5.4 or greater.


For seeing the routes available run:
 
```
$ php artisan routes
```


To run the JavaScript tests:

```
$ karma start karma.conf.js
```

You will need node.js (from nodejs.org) and karma (`npm install -g karma`).  
The configuration option ```autoWatch: true``` is set, so the tests will be automatically be rerun if one of the files changes.  

add

'Github' => array(
            'client_id'     => 'XXXXX',
            'client_secret' => 'XXXXX',
            'scope'         => array(),
        ),

to app/config/packages/artdarek/oauth-4-laravel/config.php
