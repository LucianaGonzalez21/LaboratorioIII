<?php
require_once("./alumno.php");

use Gonzalez\Alumno;

//RECUPERO TODOS LOS VALORES (POST)

if($_SERVER["REQUEST_METHOD"] == "GET")
{
    $accion = isset($_GET["accion"]) ? $_GET["accion"] : null;
}
else
{
    $accion = isset($_POST["accion"]) ? $_POST["accion"] : null;

}
$nombre = isset($_POST["nombre"]) ? $_POST["nombre"] : NULL;
$apellido = isset($_POST["apellido"]) ? $_POST["apellido"] : NULL;
$legajo = isset($_POST["legajo"]) ? (int)$_POST["legajo"] : 0;

switch ($accion) {
    case "agregar": //create
        
        $obj = new Alumno($nombre, $apellido, $legajo);

        if(Alumno::Agregar($obj))
        {
            echo "<h2> registro AGREGADO </h2><br>";
        }

        break;
    
    case "listar": //read - listar
        
        echo Alumno::Listar();

        break;

    case "verificar":

        echo Alumno::Verificar($legajo)? "El alumno con legajo " . $legajo . " se encuentra en el listado" : "El alumno con legajo " . $legajo . " no se encuentra en el listado";
        break;

    case  "modificar": //Update - modificar

        $obj = new Alumno($nombre, $apellido, $legajo);

        if(Alumno::Modificar($obj))
        {
            echo "<h2> registro MODIFICADO </h2><br/>";
        }

        break;

    case "borrar": //Delete - eliminar
        
        if(Alumno::Borrar($legajo))
        {
            echo "<h2> el alumno con legajo $Alumno->legajo se ha borrado </h2><br>";
        }
        break;


    default:
        echo "<h2> no existe tal opcion </h2>";
        break;
    }