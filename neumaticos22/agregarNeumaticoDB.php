<?php

require_once "clases/neumaticoDB.php";

use Gonzalez\Luciana\NeumaticoDB;

$marca = isset($_POST["marca"])? $_POST["marca"] : null;
$medidas = isset($_POST["medidas"])? $_POST["medidas"] : null;
$precio = isset($_POST["precio"])? $_POST["precio"] : null;
$foto = isset($_FILES["foto"]) ? $_FILES["foto"] : null;

$path = $marca . "." . date("His") . "." . pathinfo($foto["name"], PATHINFO_EXTENSION);
$destino = "neumaticos/imagenes/" . $path;

$neumatico = new NeumaticoDB($marca, $medidas, $precio,0, $destino);
$obj = new stdClass();

if($neumatico->Agregar()){
    if(move_uploaded_file($foto["tmp_name"], $destino)){
        $obj->mensaje = "Se agrego el neumatico con exito";
        $obj->exito = true;
        //header("Location: http://localhost/parcial_progra_2020/Listado.php");
    }
    else{
        $obj->mensaje = "Error al guardar la foto";
        $obj->exito = false;
    }
}else{
    $obj->mensaje = "Error al agregar";
    $obj->exito = false;
}

echo json_encode($obj);