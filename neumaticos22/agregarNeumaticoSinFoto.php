<?php

require_once "clases/neumaticoDB.php";
use Gonzalez\Luciana\NeumaticoDB;

$neumatico_json = isset($_POST["neumatico_json"]) ? $_POST["neumatico_json"] : null;    //marca, medidas, precio
$neumaticoObjeto = json_decode($neumatico_json);
$neumatico = new NeumaticoDB($neumaticoObjeto->marca, $neumaticoObjeto->medidas, $neumaticoObjeto->precio);
$obj = new stdClass();

if($neumatico->agregar()){
    $obj->mensaje = "Se agrego el neumatico con exito";
    $obj->exito = true;
}else{
    $obj->mensaje = "Error al agregar el neumatico";
    $obj->exito = false;
}

echo json_encode($obj);