<?php
require "vendor/autoload.php";

use Illuminate\Database\Capsule\Manager;

$config = parse_ini_file('config/config.ini', true);

define("SITENAME", $config["general"]["sitename"]);
define("TWIG_CACHEDIR", $config["twig"]["cachedir"]);

// boot eloquent
$manager = new Manager();
$manager->addConnection($config['database']);
$manager->bootEloquent();