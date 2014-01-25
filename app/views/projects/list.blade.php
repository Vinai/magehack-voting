@extends('layouts.default')

@section('main')

<h1>MageHack Projects:</h1>

<div ng-app="magehack-voting" ng-cloak>
    <?php $initData = array_intersect_key(
        (Auth::check() ? Auth::user()->getAttributes() : array('id' => '')),
        array_flip(array('id', 'firstname', 'lastname', 'is_admin', 'github_username', 'max_votes', 'avatar_url'))
    ) ?>
    <?php $initData['voting_enabled'] = Config::get('settings.voting') ?>
    <mage-hack-votes-init><?php echo json_encode($initData) ?></mage-hack-votes-init>
    
    <div class="projects-container" ng-controller="ProjectsController">

        <div class="sorting-box">
            Sort by
            <a href="" class="btn btn-default" title="Sort by date" ng-click="sorting='id'">
                <span ng-show="sorting!='id'"><span class="glyphicon"></span> Date</span> 
                <span ng-show="sorting=='id'"><span class="glyphicon glyphicon-ok"></span> Date</span>  
            </a>
            <a href="" class="btn btn-default" title="Sort by votes" ng-click="sorting='votes.length'">
                <span ng-show="sorting!='votes.length'"><span class="glyphicon"></span> Votes</span> 
                <span ng-show="sorting=='votes.length'"><span class="glyphicon glyphicon-ok"></span> Votes</span>  
            </a>
            <a href="" class="btn btn-default" title="Reverse sort" ng-click="sort_reverse=!sort_reverse">
                <span ng-show="sort_reverse"><span class="glyphicon glyphicon-circle-arrow-down"></span> Direction</span> 
                <span ng-hide="sort_reverse"><span class="glyphicon glyphicon-circle-arrow-up"></span> Direction</span>  
            </a>
            <input ng-model="searchText"/> <span class="glyphicon glyphicon-search"></span>
        </div>
        
        <div class="panel panel-default project" ng-repeat="project in projects | orderBy:sorting:sort_reverse | filter:searchTitleAndDescription:false ">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-9">
                        <span ng-hide="project.edit_mode">
                            @if(Config::get('settings.creator-gravatar-show'))
                            <img class="creator-gravatar" ng-if="project.creator.avatar_url" ng-src="@{{ project.creator.avatar_url }}" title="@{{  project.creator.github_username  }}">
                            @endif
                            <h3 class="panel-title">
                                @{{ project.title }}
                                <a href="" ng-show="user.mayEditProject(project)" title="Edit" >
                                    <span class="glyphicon glyphicon-edit" ng-click="startEdit(project)"></span>
                                </a>
                                <a href="" ng-show="user.mayDeleteProject(project)" title="Delete">
                                    <span class="glyphicon glyphicon-remove-circle" ng-click="deleteProject(project)"></span>
                                </a>
                            </h3>
                            <span ng-hide="project.voteCount() == 1">@{{ project.voteCount() }} Votes</span>
                            <span ng-show="project.voteCount() == 1">@{{ project.voteCount() }} Vote</span>
                            <span ng-show="user.voteCountForProject(project) > 0">(@{{ user.voteCountForProject(project) }} from me)</span>
                        </span>
                        @{{ project.errTitle }}
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
                            <span class="glyphicon glyphicon-save" ng-show="project.isValid()"></span>
                            <span class="glyphicon glyphicon-exclamation-sign" ng-hide="project.isValid()"></span>
                            Save
                        </a>
                    </div>
                    @endif
                </div>
            </div>
            <div class="panel-body">
                <p class="whitespace-pre" ng-hide="project.edit_mode">@{{ project.description }}</p>
                <p ng-show="project.edit_mode">
                    @{{ project.errDescription }}
                    {{ Form::textarea('description','', array('class' => 'form-control', 'ng-model' => 'project.description')); }}
                </p>
                <p>
                    <div ng-show="project.github_url && !project.edit_mode">GitHub Repository: <a href="@{{ project.github_url }}">@{{ project.github_url }}</a></div>
                    <div ng-show="project.hangout_url && !project.edit_mode">Google Hangout: <a href="@{{ project.hangout_url }}">@{{ project.hangout_url }}</a></div>
                </p>
                <p ng-show="project.edit_mode">
                    {{ Form::label('github_url', 'GitHub:'); }}
                    {{ Form::text('github_url','', array('class' => 'form-control', 'ng-model' => 'project.github_url')); }}
                    {{ Form::label('hangout_url', 'Hangout:'); }}
                    {{ Form::text('hangout_url','', array('class' => 'form-control', 'ng-model' => 'project.hangout_url')); }}
                </p>
            </div>
            @if(Config::get('settings.participants-gravatar-show'))
            <div class="panel-heading panel-participants">
                <ul class="participants">
                    <li ng-repeat="vote in project.votes">
                        <a>
                            <img ng-if="vote.user.avatar_url" height="40" ng-src="@{{ vote.user.avatar_url }}" width="40" title="@{{  vote.user.github_username  }}"/>
                        </a>
                    </li>
                </ul>
            </div>
            @endif
        </div>
        <div ng-show="user.mayCreateProject()">
            <h1>Submit Your Own Project:</h1>
        
            <div class="error-msgs" ng-show="formErrors">@{{ formErrors }}</div>
            <form ng-submit="createProject()" name="project" novalidate="">
            {{ Form::label('title', 'Title:'); }}
                <span class="glyphicon glyphicon-exclamation-sign" ng-hide="!newProject.title || newProject.isValid('title')"></span>
                <span class="glyphicon glyphicon-ok-sign" ng-show="newProject.isValid('title')"></span>
            {{ Form::text('title','', array('class' => 'form-control', 'ng-model' => 'newProject.title')); }}
            {{ Form::label('description', 'Description:'); }}
                <span class="glyphicon glyphicon-exclamation-sign" ng-hide="!newProject.description || newProject.isValid('description')"></span>
                <span class="glyphicon glyphicon-ok-sign" ng-show="newProject.isValid('description')"></span>
            {{ Form::textarea('description','', array('class' => 'form-control', 'ng-model' => 'newProject.description')); }}
            {{ Form::label('github_url', 'GitHub:'); }}
            {{ Form::url('github_url','', array('class' => 'form-control', 'ng-model' => 'newProject.github_url')); }}
            {{ Form::label('hangout_url', 'Hangout:'); }}
            {{ Form::url('hangout_url','', array('class' => 'form-control', 'ng-model' => 'newProject.hangout_url')); }}
            {{ Form::submit('Submit'); }}
            </form>
        </div>
    </div>
</div>

@stop