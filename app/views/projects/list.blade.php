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
                        <span ng-hide="project.edit_mode">
                            <h3 class="panel-title">
                                @{{ project.title }}
                                <span ng-show="user.mayEditProject(project)" title="Edit" class="glyphicon glyphicon-edit" ng-click="startEdit(project)"></span>
                                <span ng-show="user.mayDeleteProject(project)" title="Delete" class="glyphicon glyphicon-remove-circle" ng-click="deleteProject(project)"></span>
                            </h3>
                            <span ng-hide="project.voteCount() == 1">@{{ project.voteCount() }} Votes</span>
                            <span ng-show="project.voteCount() == 1">@{{ project.voteCount() }} Vote</span>
                            <span ng-show="user.voteCountForProject(project) > 0">(@{{ user.voteCountForProject(project) }} from me)</span>
                        </span>
                        {{ Form::text('title','', array('class' => 'form-control', 'ng-model' => 'project.title', 'ng-show' => 'project.edit_mode')); }}
                    </div>
                    @if(Auth::check())
                    <div class="col-md-3 a-right" ng-hide="project.edit_mode">
                        <a href="" class="btn btn-default" title="Remaining Votes: @{{user.remainingVotes()}}" ng-show="user.mayVote(project)" ng-click="vote(project)">
                            <span class="glyphicon glyphicon-thumbs-up"></span> Vote
                        </a>
                        <a href="" class="btn btn-default"  title="Remaining Votes: @{{user.remainingVotes()}}" ng-show="user.mayUnvote(project)" ng-click="unvote(project)">
                            <span class="glyphicon glyphicon-thumbs-down"></span> Unvote
                        </a>
                    </div>
                    <div class="col-md-3 a-right" ng-show="project.edit_mode">
                        <a href="" class="btn btn-default" title="Cancel" ng-click="cancelEdit(project)">
                            <span class="glyphicon glyphicon-minus-sign"></span> Cancel
                        </a>
                        <a href="" class="btn btn-default"  title="Save" ng-click="saveEdit(project)">
                            <span class="glyphicon glyphicon-save"></span> Save
                        </a>
                    </div>
                    @endif
                </div>
            </div>
            <div class="panel-body">
                <p class="whitespace-pre" ng-hide="project.edit_mode">@{{ project.description }}</p>
                <p ng-show="project.edit_mode">
                    {{ Form::textarea('description','', array('class' => 'form-control', 'ng-model' => 'project.description')); }}
                </p>
                <p ng-show="(project.github || project.hangout_url) && ! project.edit_mode">
                    <div ng-show="project.github">GitHub Repository: <a href="@{{ project.github }}">@{{ project.github }}</a></div>
                    <div ng-show="project.hangout_url">Google Hangout: <a href="@{{ project.hangout_url }}">@{{ project.hangout_url }}</a></div>
                </p>
                <p ng-show="project.edit_mode">
                    <!--
                    {{ Form::label('github', 'GitHub:'); }}
                    {{ Form::text('github','', array('class' => 'form-control', 'ng-model' => 'project.github')); }}
                    -->
                    {{ Form::label('hangout_url', 'Hangout:'); }}
                    {{ Form::text('hangout_url','', array('class' => 'form-control', 'ng-model' => 'project.hangout_url')); }}
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
            -->
            {{ Form::label('hangout_url', 'Hangout:'); }}
            {{ Form::text('hangout_url','', array('class' => 'form-control', 'ng-model' => 'newProject.hangout_url')); }}
            {{ Form::submit('Submit'); }}
            </form>
        </div>
    </div>
</div>

@stop