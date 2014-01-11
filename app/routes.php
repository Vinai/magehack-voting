<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/',  array('as' => 'project.index', 'uses' => 'ProjectController@index'));


Route::get('oauth2/{provider}', 'OauthController@index');

Route::get('login', array('as' => 'login', function () {
    return Redirect::to('oauth2/google');
}))->before('guest');

Route::get('logout', array('as' => 'logout', function () {
    Auth::logout();
    return Redirect::to('/');
}))->before('auth');

