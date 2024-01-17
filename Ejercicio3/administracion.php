<?php

$nombre = isset($_POST["nombre"])? $_POST["nombre"] : null;
$apellido = isset($_POST["apellido"])? $_POST["apellido"] : null;
$dni = isset($_POST["dni"])? (int)$_POST["dni"] : 0;
$sexo = isset($_POST["sexo"])? $_POST["sexo"] : null;
$legajo = isset($_POST["legajo"])? (int)$_POST["legajo"] : 0;
$sueldo = isset($_POST["sueldo"])? (int)$_POST["sueldo"] : 0;

if($nombre==null && $apellido==null && $dni==0 && $sexo==null && $legajo==0 && $sueldo==0)
{
    echo "Se enviaron datos vacios";
    echo '<a href="http://localhost/Laboratorio%20III/Ejercicio3/html/index.html">Volver</a>';
}

