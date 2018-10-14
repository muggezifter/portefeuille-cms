<?php
use Portefeuille\RouterInterface;
use Portefeuille\Router;

return [
    RouterInterface::class => DI\create(Router::class),
];