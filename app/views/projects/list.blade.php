@extends('layouts.default')

@section('main')

<h1>MageHack Projects:</h1>

<div ng-app="magehack-voting" ng-cloak>
    <?php $initData = array_intersect_key(
        (Auth::check() ? Auth::user()->getAttributes() : array('id' => '')),
        array_flip(array('id', 'firstname', 'lastname', 'is_admin', 'github_username', 'max_votes', 'avatar_url'))
    ) ?>
    <mage-hack-votes-init><?php echo json_encode($initData) ?></mage-hack-votes-init>
    <div class="projects-container" ng-controller="ProjectsController">
        <div class="panel panel-default project" ng-repeat="project in projects">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-9">
                        <h3 class="panel-title">
                            @{{ project.title }}
                            <span ng-show="user.mayDeleteProject(project)" class="glyphicon glyphicon-remove-circle" ng-click="deleteProject(project)"></span>
                        </h3>
                        <span ng-hide="project.voteCount() == 1">@{{ project.voteCount() }} Votes</span><span
                            ng-show="project.voteCount() == 1">@{{ project.voteCount() }} Vote</span><span
                            ng-show="user.voteCountForProject(project) > 0">, @{{ user.voteCountForProject(project) }} from me</span>
                    </div>
                    @if(Auth::check())
                    <div class="col-md-3 a-right">
                        <a href="" class="btn btn-default" title="Remaining Votes: @{{user.remainingVotes()}}" ng-show="user.mayVote(project)" ng-click="vote(project)">
                            <span class="glyphicon glyphicon-thumbs-up"></span> Vote
                        </a>
                        <a href="" class="btn btn-default"  title="Remaining Votes: @{{user.remainingVotes()}}" ng-show="user.mayUnvote(project)" ng-click="unvote(project)">
                            <span class="glyphicon glyphicon-thumbs-down"></span> Unvote
                        </a>
                    </div>
                    @endif
                </div>
            </div>
            <div class="panel-body">
                <p>@{{ project.description }}</p>
                <p ng-show="project.github || project.hangout">
                    <div ng-show="project.github">GitHub Repository: <a href="@{{ project.github }}">@{{ project.github }}</a></div>
                    <div ng-show="project.hangout">Google Hangout: <a href="@{{ project.hangout }}">@{{ project.hangout }}</a></div>
                </p>
            </div>
            <div class="panel-heading panel-participants">
                <ul class="participants">
                    <li ng-repeat="vote in project.votes">
                        <a>
                            <img ng-if="vote.user.avatar_url" height="40" src="@{{ vote.user.avatar_url }}" width="40" title="@{{  vote.user.github_username  }}"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div ng-show="user.mayCreateProject()">
            <h1>Submit Your Own Project:</h1>
        
            <div ng-show="formErrors">@{{ formErrors }}</div>
            <form ng-submit="createProject()">
            {{ Form::label('title', 'Title:'); }}
            {{ Form::text('title','', array('class' => 'form-control', 'ng-model' => 'newProject.title')); }}
            {{ Form::label('description', 'Description:'); }}
            {{ Form::textarea('description','', array('class' => 'form-control', 'ng-model' => 'newProject.description')); }}
            <!--
            {{ Form::label('github', 'GitHub:'); }}
            {{ Form::text('github','', array('class' => 'form-control', 'ng-model' => 'newProject.github')); }}
            {{ Form::label('hangout', 'Hangout:'); }}
            {{ Form::text('hangout','', array('class' => 'form-control', 'ng-model' => 'newProject.hangout')); }}
            -->
            {{ Form::submit('Submit'); }}
            </form>
        </div>
    </div>
</div>

@stop