<?php

require_once "clases/neumaticoDB.php";

use Gonzalez\Luciana\NeumaticoDB;

$obj_neumatico = isset($_POST["obj_neumatico"]) ? $_POST["obj_neumatico"] : null;    //marca y medidas
$neumaticoObj = json_decode($obj_neumatico);

$existe = false;
$arrayNeumaticos = NeumaticoDB::traer();
$neumaticoAVerificar = new NeumaticoDB($neumaticoObj->marca, $neumaticoObj->medidas);

if ($neumaticoAVerificar->existe($arrayNeumaticos)) {
    foreach ($arrayNeumaticos as $neumaticoItem) {
        $neumaticoItemJson = $neumaticoItem->toJSON();
        $neumaticoItemObj = json_decode($neumaticoItemJson);
        if($neumaticoItemObj->marca == $neumaticoObj->marca && $neumaticoItemObj->medidas == $neumaticoObj->medidas){
            echo $neumaticoItemJson;
            $existe = true;
            break;
        }
    }
}

if(!$existe){
    echo "{}";
}