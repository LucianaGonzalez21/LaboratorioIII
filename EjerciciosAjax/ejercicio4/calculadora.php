<?php

$numUno = isset($_GET["numUno"]) ? (int)$_GET["numUno"] : 0;
$numDos = isset($_GET["numDos"]) ? (int)$_GET["numDos"] : 0;
$operador = isset($_GET["operador"]) ? $_GET["operador"] : null;

if ($numUno == null || $numDos == null) {
    echo "Error. Debe ingresar dos numeros";
    die();
}

switch ($operador) {
    case "suma":
        echo $numUno + $numDos;
        break;
    case "resta":
        echo $numUno - $numDos;
        break;
    case "division":
        if($numDos != 0){
            echo $numUno / $numDos;
        }else{
            echo "No se puede dividir por cero";
        }
        break;
    case "multiplicacion":
        echo $numUno * $numDos;
        break;
    default:
        echo "Debe elegir una operacion";
}
