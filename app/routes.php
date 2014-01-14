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

// Create restful controllers only available for authenticated users
Route::group(array('before'=>'auth'), function() {
    Route::resource('projects', 'ProjectController');
    Route::resource('users', 'UserController');
    Route::resource('votes', 'VoteController');
});

//
Route::get('projects','ProjectController@index');

// We map the homepage to the the project index
Route::get('/', function()
{
    return View::make('projects.list');
});
// Oauth controller for user registration and login
Route::get('oauth2/{provider}', 'OauthController@index');

// Simple redirect to the login controller
Route::get('login', array('as' => 'login', function () {
    return Redirect::to('oauth2/github');
}));

// Dirty but effective way of handling the logout
Route::get('logout', array('as' => 'logout', function () {
    Auth::logout();
    return Redirect::to('/');
}))->before('auth');


Route::get('project/votes/{id}', function($id){
    $collection = DB::table('votes')
        ->join('users', 'users.id', '=', 'votes.user_id')
        ->where('votes.project_id', '=', $id)
        ->select('votes.id', 'votes.user_id', 'users.avatar_url', 'users.github_username')
        ->get();
    return $collection;
});

