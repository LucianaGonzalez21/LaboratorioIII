<?php

require_once "clases/neumatico.php";
use Gonzalez\Luciana\Neumatico;

$marca = isset($_POST["marca"])? $_POST["marca"] : null;
$medidas = isset($_POST["medidas"])? $_POST["medidas"] : null;

$neumatico = new Neumatico($marca, $medidas);
$retornoJson = Neumatico::verificarNeumaticoJSON($neumatico);

echo $retornoJson;

