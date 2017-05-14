<?php

namespace Portefeuille\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Image
 * @package Portefeuille\Models
 */
class Image extends Model
{
    public $timestamps = false;

    /**
     * @return mixed
     */
    public function folder()
    {
        return $this->belongsTo('Portefeuille\Models\ImageFolder');
    }
}