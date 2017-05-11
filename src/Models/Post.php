<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Post
 * @package Portefeuille\Models
 */
class Post extends Model
{
    public $timestamps = false;

    /**
     * @return mixed
     */
    public function postType()
    {
        return $this->belongsTo('Portefeuille\Models\PostType');
    }

    /**
     * @return mixed
     */
    public function bottombannerType()
    {
        return $this->belongsTo('Portefeuille\Models\BottombannerType');
    }

    /**
     * @return mixed
     */
    public function topbannerType()
    {
        return $this->belongsTo('Portefeuille\Models\TopbannerType');
    }

    /**
     * @return mixed
     */
    public function sidebars()
    {
        return $this->hasMany('Portefeuille\Models\Sidebar');
    }

    /**
     * @return mixed
     */
    public function categories()
    {
        return $this->belongsToMany('Portefeuille\Models\Category');
    }

    /**
     * @return mixed
     */
    public function category()
    {
        return $this->belongsTo('Portefeuille\Models\Category');
    }
}