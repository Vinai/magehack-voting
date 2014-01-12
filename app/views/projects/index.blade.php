@extends('layouts.default')

@section('main')

<h1>MageHack Projects:</h1>


<div class="projects-container" ng-controller="ProjectsController">
    <div class="panel panel-default project" ng-repeat="project in projects">
        <div class="panel-heading">
            <div class="row">
                <div class="col-md-11">
                    <h3 class="panel-title">@{{ project.title }}</h3>
                </div>
                @if(Auth::check())
                <div class="col-md-1">
                    <a href="{{ URL::route('project.index') }}" class="btn btn-default">
                        <span class="glyphicon glyphicon-thumbs-up"></span> Vote
                    </a>
                </div>
                @endif
            </div>
        </div>
        <div class="panel-body">
            <p>@{{ project.description }}</p>
        </div>
        <div class="panel-heading panel-participants">
            <ul class="participants" ng-controller="VotesController">
                <li ng-repeat="vote in projectVotes">
                    <a>
                        <img height="40" src="@{{ vote.avatar_url }}" width="40">
                    </a>
                </li>
            </ul>
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