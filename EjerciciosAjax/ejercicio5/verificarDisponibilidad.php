<?php

$nombre = isset($_GET["nombre"])? $_GET["nombre"] : null;

if($nombre == null) {
    echo "Debe ingresar un nombre";
    die();
}

sleep(rand(0,6));
echo (rand(0,1) == 0)? "SI" : "NO";

