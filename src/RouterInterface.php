<?php
namespace Portefeuille;

interface RouterInterface { 
    function addRoutes($routes);
    function match();
}
