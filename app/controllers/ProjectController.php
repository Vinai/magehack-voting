<?php

class ProjectController extends \BaseController
{
    public function __construct(Project $project)
    {
        $this->project = $project;
    }

    /**
     * Return a list of all the projects available
     *
     * @return mixed
     */
    public function index()
	{
        // Get all projects and load the owner and the votes with their corresponding users.
        $project = Project::with(array('user'=>function($query){
                $query->select('id','firstname','lastname','is_admin','avatar_url','github_username');
            }))
            ->with(array('votes'=>function($query){
                    $query->select('id','user_id','project_id','created_at','updated_at')
                        ->with(array('user'=>function($query){
                            $query->select('id','firstname','lastname','is_admin','avatar_url','github_username');
                        }));
                }))
            ->get();

        return $project;
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
        $validation = Validator::make($input, Project::$rules);

        // If validation passes create and return project
        if ($validation->passes())
        {
            $input['user_id'] = $user->id;
            $project = $this->project->create($input);

            return $project;
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
        // Get the requested project by id with the user and vote models
        $project = Project::where('id','=',$id)
            ->with(array('user'=>function($query){
                    $query->select('id','firstname','lastname','is_admin','avatar_url','github_username');
                }))
            ->with('votes')
            ->first();

        return $project;
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
        $validation = Validator::make($input, Project::$rules);

        if ($validation->passes())
        {
            $project = $this->project
                ->where('id', '=', $id)
                ->where('user_id', '=', $user->id)
                ->with('user')
                ->with('votes')
                ->first();
            $project->update($input);

            return $project;
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
		// Delete the post provided
        $this->project->find($id)->delete();

    }
}