<?php
require_once "clases/neumaticoDB.php";

use Gonzalez\Luciana\NeumaticoDB;

$neumaticoStr = isset($_POST["neumatico_json"]) ? $_POST["neumatico_json"] : null;    //id, marca, medidas, precio
$neumaticoJson = json_decode($neumaticoStr);
$foto = isset($_FILES["foto"]) ? $_FILES["foto"] : null;
$pathNueva = "neumaticos/imagenes/" . $neumaticoJson->marca . "." . date("His") . "modificado" . "." . pathinfo($foto["name"], PATHINFO_EXTENSION);
$destinoBorrada = "neumaticosModificados/" . $neumaticoJson->id . "." . $neumaticoJson->marca . "." . "modificado" . "." . date("His") . "." . pathinfo($foto["name"], PATHINFO_EXTENSION);
$obj = new stdClass();
$arrayNeumaticos = NeumaticoDB::traer();
foreach ($arrayNeumaticos as $itemNeumatico) {
    $itemNeumaticoStr = $itemNeumatico->toJSON();
    $itemNeumaticoObj = json_decode($itemNeumaticoStr);
    if ($itemNeumaticoObj->id == $neumaticoJson->id) {
        //var_dump($itemNeumaticoObj);
        //die();
        $pathFoto  = $itemNeumaticoObj->pathFoto;
        //echo $pathFoto;die();
        break;
    }
}
$neumaticoModificado = new NeumaticoDB($neumaticoJson->marca, $neumaticoJson->medidas, $neumaticoJson->precio, $neumaticoJson->id, $pathNueva);
if ($neumaticoModificado->modificar()) {
    $obj->mensaje = "Exito al modificar";

    if(move_uploaded_file($foto["tmp_name"], $pathNueva)){
        $obj->mensaje .= ". Exito al mover la foto nueva";
    }else{
        $obj->mensaje .= ". Error al mover la foto nueva";

    }

    if (rename($pathFoto, $destinoBorrada)) {
        $obj->mensaje .=  ". Exito al mover la foto anterior";
        $obj->exito = true;
    } else {
        $obj->mensaje .= ". Error al mover la foto anterior";
        $obj->exito = false;
    }
} else {
    $obj->mensaje = "Error al modificar";
    $obj->exito = false;
}

echo json_encode($obj);
