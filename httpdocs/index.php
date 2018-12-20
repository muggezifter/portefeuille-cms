<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "../vendor/autoload.php";

use Illuminate\Database\Capsule\Manager;
use Portefeuille\Portefeuille;
use DI\ContainerBuilder;

$config = parse_ini_file('../config/config.ini', true);

define("SITENAME", $config["general"]["sitename"]);
define("TWIG_CACHEDIR", $config["twig"]["cachedir"]);
define("TWIG_TEMPLATEDIR", $config["twig"]["templatedir"]);
// Boot bootEloquent
$manager = new Manager();
$manager->addConnection($config['database']);
$manager->bootEloquent();

$container_builder = new ContainerBuilder();
$container_builder->addDefinitions("../di_config.php");
$container = $container_builder->build();

$portefeuiile = $container->get(Portefeuille::class);
$portefeuiile->run();


