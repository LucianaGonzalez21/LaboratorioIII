<?php

require_once "clases/neumaticoDB.php";

use Gonzalez\Luciana\NeumaticoDB;

$neumatico_json = isset($_POST["neumatico_json"]) ? $_POST["neumatico_json"] : null;    //id, marca, medidas, precio
$neumaticoObjeto = json_decode($neumatico_json);
$neumatico = new NeumaticoDB($neumaticoObjeto->marca, $neumaticoObjeto->medidas, $neumaticoObjeto->precio, $neumaticoObjeto->id);
$obj  = new stdClass();

$existe = false;

$arrayNeumaticos = NeumaticoDB::traer();
foreach ($arrayNeumaticos as $unNeumatico) {
    $neumaticoJson = $unNeumatico->toJSON();
    $neumaticoObj = json_decode($neumaticoJson);
    if ($neumaticoObjeto->id == $neumaticoObj->id) {
        $existe = true;
        break;
    }
}


if ($existe && NeumaticoDB::eliminar($neumaticoObjeto->id)) {
    $neumatico->guardarJSON("./archivos/neumaticos_eliminados.json");
    $obj->exito = true;
    $obj->mensaje = "Se elimino el neumatico con exito";
} elseif (!$existe) {
    $obj->exito = false;
    $obj->mensaje = "No existe un neumatico con ese id";
} else {

    $obj->exito = false;
    $obj->mensaje = "Error al eliminar";
}

echo json_encode($obj);
