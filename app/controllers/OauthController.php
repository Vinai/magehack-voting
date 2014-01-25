<?php

class OauthController extends BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($provider)
	{

        // get data from input
        $code = Input::get( 'code' );
        // get google service
        $provider = 'GitHub'; //ucfirst($provider);
        $service = OAuth::consumer($provider);

        // check if code is valid

        // if code is provided get user data and sign in
        if ( !empty( $code ) ) {

            // This was a callback request from google, get the token
            $token = $service->requestAccessToken( $code );

            // Send a request with it
            $result = json_decode( $service->request( 'user' ), true );
            $email = (isset($result['email']) ? $result['email'] : 'unknown@corehack.de');
            $user = User::where('email', '=', $email)->first();

            if($user){
                $user->github_accesstoken = $token->getAccessToken();
                $user->save();

            }else {
                $user = new User;
                $name = (isset($result['name']) ? $result['name'] : 'John Doe');
                $name = explode(' ',$name);

                $user->email        = (isset($result['email']) ? $result['email'] : 'unknown@corehack.de');
                $user->firstname    = $name[0];
                $user->lastname     = $name[1];
                $user->avatar_url   = (isset($result['avatar_url']) ? $result['avatar_url'] : 'https://gravatar.com/avatar/371cd989d5a0857c5cd9186982137afb?d=https%3A%2F%2Fidenticons.github.com%2Fe0584e9afe8a5c979e4ea6df9dcfe8d2.png&r=x');

                $user->github_username    = $result['login'];
                $user->github_accesstoken = $token->getAccessToken();

                $user->save();
            }

            Auth::login($user);
            return Redirect::intended('/')
                ->with('message', 'You Successfully Logged in')
                ->with('message-type', 'success');

        }
        // if not ask for permission first
        else {
            // get googleService authorization
            $url = $service->getAuthorizationUri();

            // return to facebook login url
            return Redirect::away(urldecode($url));

        }
	}

}
