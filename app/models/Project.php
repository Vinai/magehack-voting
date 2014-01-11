<?php

class Project extends Eloquent {
	protected $guarded = array();
    protected $softDelete = true;

	public static $rules = array();
}
