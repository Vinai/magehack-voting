<?php

class VoteController extends \BaseController
{
    public function __construct(Vote $vote)
    {
        $this->vote = $vote;
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $vote = Vote::all();

        return $vote;
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        // Get the current user
        $user   = Auth::user();

        // Get the Post input values
        $input  = Input::all();

        // Validate against the model rules
        $validation = Validator::make($input, Vote::$rules);

        // If validation passes create and return project
        if ($validation->passes())
        {
            $input['user_id'] = $user->id;
            $vote = $this->vote->create($input);
            return $vote;
        }

        return Redirect::route('projects.index')
            ->withInput()
            ->withErrors($validation)
            ->with('message', 'There were validation errors.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
        $vote = Vote::where('id','=',$id)
            ->first();

        return $vote;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
        // Get the current user
        $user   = Auth::user();

        // Get the Post input values
        $input = array_except(Input::all(), '_method');

        // Validate the input against the project model rules
        $validation = Validator::make($input, Vote::$rules);

        if ($validation->passes())
        {
            $vote = $this->vote->find($id);
            $vote->update($input);

            return $vote;
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
        // Delete the vote provided
        $this->vote->find($id)->delete();

    }

}