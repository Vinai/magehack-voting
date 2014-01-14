<?php

class UserController extends \BaseController
{
    public function __construct(User $user)
    {
        $this->user = $user;
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $user = User::with('projects')
            ->with('votes')
            ->get();

        return $user;
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        $user = User::where('id','=',$id)
            ->with('projects')
            ->with('votes')
            ->first();

        return $user;
	}

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        // Get the Post input values
        $input = array_except(Input::all(), '_method');

        // Validate the input against the project model rules
        $validation = Validator::make($input, User::$rules);

        if ($validation->passes())
        {
            $user = $this->user->update($input);

            return $user;
        }

        return Redirect::route('projects.index')
            ->withInput()
            ->withErrors($validation)
            ->with('message', 'There were validation errors.');
    }

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
        $this->user->find($id)->delete();
	}

}