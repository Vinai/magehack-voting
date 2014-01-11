<!doctype html>
<html lang="en" ng-app>
<head>
    <meta charset="UTF-8">
    <title>MageHack Voting</title>
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.8/angular.min.js"></script>
</head>

<body>
    @if (Session::has('message'))
    <div class="flash alert">
        <p>{{ Session::get('message') }}</p>
    </div>
    @endif

    @if (!Auth::check())
        <div class="login message">
            <p>You need to be logged in to post new project ideas and vote, {{  link_to_route('login', 'Click here to Login') }}</p>
        </div>
    @endif

    @yield('main')
</body>