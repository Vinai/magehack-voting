<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>MageHack Voting</title>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular.min.js"></script>

    {{ HTML::script('js/main.js') }}
    {{ HTML::style('css/main.css') }}
    {{ HTML::style('css/font-awesome.css') }}

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
                    <li>
                        <a>
                            <img height="20" src="{{Auth::user()->avatar_url}}" width="20">
                            {{Auth::user()->github_username}}
                        </a>
                    </li>
                    <li>{{ link_to_route('logout', 'Log Out') }}</li>
                @else

                    <a href="{{ URL::route('login') }}" class="btn btn-block btn-social btn-github">
                        <i class="fa fa-github"></i> Sign in with GitHub
                    </a>

                @endif
            </ul>
        </div><!--/.nav-collapse -->
    </div>
</div>


<div class="container">

    @if (Session::has('message'))
    <div class="flash alert alert-{{Session::get('message-type')}}">
        <p>{{ Session::get('message') }}</p>
    </div>
    @endif

    @yield('main')

</div> <!-- /container -->

</body>