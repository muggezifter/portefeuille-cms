<?php
require "vendor/autoload.php";

use Illuminate\Database\Capsule\Manager;

$config = parse_ini_file('config/config.ini', true);

define("SITENAME", $config["general"]["sitename"]);

// boot eloquent
$manager = new Manager();
$manager->addConnection($config['database']);
$manager->bootEloquent();