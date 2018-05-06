<?php
namespace Portefeuille\Validators;


class CategoryValidator extends BaseValidator {
 
    public function __construct($data) {
        parent::__construct($data,'categories');
    }

    public function validate() {
        return ['status' => 'ok'];
    }
}