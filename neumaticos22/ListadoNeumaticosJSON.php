<?php

require_once "clases/neumatico.php";
use Gonzalez\Luciana\Neumatico;

$mostrar = isset($_GET["tabla"]) && $_GET["tabla"] == "mostrar"? true : false;

if($mostrar){
    $arrayNeumaticos = Neumatico::traerJSON("./archivos/neumaticos.json");
    foreach ($arrayNeumaticos as $unNeumatico ) {
        if($unNeumatico != ""){
            /*$neumatico = new Neumatico($unNeumatico->marca, $unNeumatico->medidas, $unNeumatico->precio);
            echo $neumatico->toJSON();
            echo "\r\n";*/
            echo json_encode($unNeumatico);
            echo "\r\n";
        }
    }
}else{
    echo "Error con la peticion";
}