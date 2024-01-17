<?php

require_once "clases/neumaticoDB.php";

use Gonzalez\Luciana\NeumaticoDB;

$neumaticoStr = isset($_POST["neumatico_json"]) ? $_POST["neumatico_json"] : null;    //id, marca, medidas, precio, pathFoto
$neumaticoJson = json_decode($neumaticoStr);
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $neumatico = new NeumaticoDB($neumaticoJson->marca, $neumaticoJson->medidas, $neumaticoJson->precio, $neumaticoJson->id, $neumaticoJson->pathFoto);
    $obj = new stdClass();


    if (NeumaticoDB::eliminar($neumaticoJson->id)) {
        echo $neumatico->guardarEnArchivo();
    } else {
        $obj->exito = false;
        $obj->mensaje = "Error al eliminar";
        echo json_encode($obj);
    }
} else if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $arrayNeumaticos = NeumaticoDB::traer();
    echo "<table>";
    echo "<thead><tr><td>id</td><td>marca</td><td>medidas</td><td>precio</td><td>pathFoto</td><td>foto</td></tr></thead>";
    echo "<tbody>";
    foreach ($arrayNeumaticos as $unNeumatico) {
        $neumaticoJson = $unNeumatico->toJSON();
        $neumaticoObjeto = json_decode($neumaticoJson);
        echo "<tr><td>" . $neumaticoObjeto->id . "</td>";
        echo "<td>" . $neumaticoObjeto->marca . "</td>";
        echo "<td>" . $neumaticoObjeto->medidas . "</td>";
        echo "<td>" . $neumaticoObjeto->precio . "</td>";
        echo "<td>" . $neumaticoObjeto->pathFoto . "</td>";
        echo "<td><img src='" . $neumaticoObjeto->pathFoto . "' width=50 height=50></img></td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
}
