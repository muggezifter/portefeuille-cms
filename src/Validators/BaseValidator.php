<?php
namespace Portefeuille\Validators;

class BaseValidator {
    private $data;
    private $type;

    public function __construct($data, $type) {
        $this->data = $data;
        $this->type = $type;
    }


}