@extends('layouts.default')

@section('main')

<h1>MageHack Projects:</h1>
<div class="projects-container" ng-controller="ProjectsController">
    <div class="project" ng-repeat="project in projects">
        <h3>@{{ project.title }}</h3>
        <p>@{{ project.description }}</p>
    </div>
</div>

@stop