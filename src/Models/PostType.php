<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PostType
 * @package Portefeuille\Models
 */
class PostType extends Model
{
    public $timestamps = false;

    /**
     * @return mixed
     */
    public function posts()
    {
        return $this->hasMany('Portefeuille\Models\Post');
    }
}