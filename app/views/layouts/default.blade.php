<!doctype html>
<html lang="en" ng-app=>
<head>
    <meta charset="UTF-8">
    <title>MageHack Voting</title>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular.min.js"></script>

    {{ HTML::script('js/main.js') }}

</head>

<body>

<!-- Static navbar -->
<div class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">MageHack Voting</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                @if (Auth::check())
                    <li>{{ link_to_route('logout', 'Log Out') }}</li>
                @else
                    <a href="{{ URL::route('login') }}" class="btn">
                        <img width="200" src="https://developers.google.com/accounts/images/sign-in-with-google.png"/ >
                    </a>
                @endif
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>


<div class="container">

    @if (Session::has('message'))
    <div class="flash alert">
        <p>{{ Session::get('message') }}</p>
    </div>
    @endif

    @if (!Auth::check())
        <div class="alert alert-info">
            <p>You need to be logged in to post new project ideas and vote. </p>
        </div>
    @else
        <div class="alert alert-success">
            <p>You successfully logged in as {{Auth::user()->firstname }} {{Auth::user()->lastname }}</p>
        </div>
    @endif

    @yield('main')

</div> <!-- /container -->

</body>