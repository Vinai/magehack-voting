@extends('layouts.default')

@section('main')

<h1>MageHack Projects:</h1>


<div class="projects-container" ng-controller="ProjectsController">
    <div class="panel panel-default project" ng-repeat="project in projects">
        <div class="panel-heading">
            <h3 class="panel-title">@{{ project.title }}</h3>
        </div>
        <div class="panel-body">
            <p>@{{ project.description }}</p>
        </div>
    </div>
</div>


@if(Auth::check())
<h1>Submit Your Own Project:</h1>


{{ Form::open(array('action' => 'ProjectController@store')) }}
{{ Form::label('title', 'Title:'); }}
{{ Form::text('title','', array('class' => 'form-control')); }}
{{ Form::label('description', 'Description:'); }}
{{ Form::textarea('description','', array('class' => 'form-control')); }}
{{ Form::submit('Submit'); }}
{{ Form::close() }}

@endif

@stop