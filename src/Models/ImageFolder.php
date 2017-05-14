<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ImageFolder
 * @package Portefeuille\Models
 */
class ImageFolder extends Model
{
    public $timestamps = false;

    /**
     * @return mixed
     */
    public function images()
    {
        return $this->hasMany('Portefeuille\Models\Image');
    }
}