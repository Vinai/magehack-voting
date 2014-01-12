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
        $provider = ucfirst($provider);
        $service = OAuth::consumer($provider);

        // check if code is valid

        // if code is provided get user data and sign in
        if ( !empty( $code ) ) {

            // This was a callback request from google, get the token
            $token = $service->requestAccessToken( $code );

            // Send a request with it
            $result = json_decode( $service->request( 'user' ), true );

            $user = User::where('email', '=',  $result['email'])->first();

            if($user){
                $user->github_accesstoken = $token->getAccessToken();
                $user->save();

            }else {
                $user = new User;
                $name = explode(' ',$result['name'] );

                $user->email        = $result['email'];
                $user->firstname    = $name[0];
                $user->lastname     = $name[1];

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
