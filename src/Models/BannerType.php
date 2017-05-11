<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BannerType
 * @package Portefeuille\Models
 */
class BannerType extends Model
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