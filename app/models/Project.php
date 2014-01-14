<?php

class Project extends Eloquent {
	protected $guarded = array('id');
    protected $softDelete = true;

	public static $rules = array();

    public function user()
    {
        return $this->belongsTo('User');
    }

    public function votes()
    {
        return $this->hasMany('Vote');
    }
}
