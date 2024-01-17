<?php

$nombre = isset($_GET["nombre"])? $_GET["nombre"] : null;

if($nombre == null) {
    echo "Debe ingresar un nombre";
    die();
}

//sleep(rand(0,6));
// echo (rand(0,1) == 0)? "SI" : "NO";

if(rand(0,1) == 0){
    $ar = fopen("./archivos/nombresAlternativos.txt", "r");

    while(!feof($ar)){
        echo '<ul><li><a href="#" onclick="App6.EscribirNombres()">' . fgets($ar) . '</a></li></ul>';
    }

    fclose($ar);
}else{
    echo "Agregado";
}

