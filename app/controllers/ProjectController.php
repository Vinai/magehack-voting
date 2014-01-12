<?php

class ProjectController extends BaseController
{

    public function __construct(Project $project)
    {
        $this->project = $project;
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        return View::make('projects.index');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
        $user = Auth::user();

        $input = Input::all();
        $validation = Validator::make($input, Project::$rules);

        if ($validation->passes())
        {
            $input['user_id'] = $user->id;
            $input['hangout_url'] = '';
            $this->project->create($input);

            return Redirect::route('project.index');
        }

        return Redirect::route('project.index')
            ->withInput()
            ->withErrors($validation)
            ->with('message', 'There were validation errors.');
	}
}
