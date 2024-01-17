<?php
require_once "clases/neumaticoDB.php";
use Gonzalez\Luciana\NeumaticoDB;

$neumatico_json = isset($_POST["neumatico_json"]) ? $_POST["neumatico_json"] : null;    //id, marca, medidas, precio
$neumaticoObjeto = json_decode($neumatico_json);
$neumatico = new NeumaticoDB($neumaticoObjeto->marca, $neumaticoObjeto->medidas, $neumaticoObjeto->precio, $neumaticoObjeto->id);
$obj = new stdClass();


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

if($existe && $neumatico->modificar()){
    $obj->exito = true;
    $obj->mensaje = "Se modifico el neumatico con exito";
}else if(!$existe){
    $obj->exito = false;
    $obj->mensaje = "El neumatico no existe";
}
else{
    $obj->exito = false;
    $obj->mensaje = "Ocurrio un error al modificar el neumatico";
}

echo json_encode($obj);