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


// We map the homepage to the project list
Route::get('/',  array('as' => 'project.index', 'uses' => 'ProjectController@index'));

// Submit form only accessible for
Route::group(array('before'=>'auth'), function() {
    Route::resource('project', 'ProjectController');

});

Route::get('oauth2/{provider}', 'OauthController@index');

Route::get('login', array('as' => 'login', function () {
    return Redirect::to('oauth2/github');
}));

Route::get('logout', array('as' => 'logout', function () {
    Auth::logout();
    return Redirect::to('/');
}))->before('auth');

Route::get('projects', function(){
    return Project::all();
});

Route::get('project/votes/{id}', function($id){
    $collection = DB::table('votes')
        ->join('users', 'users.id', '=', 'votes.user_id')
        ->where('votes.project_id', '=', $id)
        ->select('votes.id', 'votes.user_id', 'users.avatar_url', 'users.github_username')
        ->get();
    return $collection;
});

