<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "../vendor/autoload.php";

use Illuminate\Database\Capsule\Manager;
use Portefeuille\Portefeuille;
use DI\Container;

$config = parse_ini_file('../config/config.ini', true);

define("SITENAME", $config["general"]["sitename"]);
define("TWIG_CACHEDIR", $config["twig"]["cachedir"]);

$di = new Container();


$p = $di->get("Portefeuille\Portefeuille");
$p->setDbConnection($config['database'])->run();

