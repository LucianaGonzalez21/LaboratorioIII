<?php

require_once "clases/neumaticoDB.php";
use Gonzalez\Luciana\NeumaticoDB;

$mostrar = isset($_GET["tabla"]) && $_GET["tabla"] == "mostrar"? true : false;
$arrayNeumaticos = NeumaticoDB::traer();

if ($mostrar) {
    echo "<table>";
    echo "<thead><tr><td>id</td><td>marca</td><td>medidas</td><td>precio</td><td>foto</td></tr></thead>";
    echo "<tbody>";
    foreach ($arrayNeumaticos as $unNeumatico) {
        $neumaticoJson = $unNeumatico->toJSON();
        $neumaticoObjeto = json_decode($neumaticoJson);
        echo "<tr><td>" . $neumaticoObjeto->id . "</td>";
        echo "<td>" . $neumaticoObjeto->marca . "</td>";
        echo "<td>" . $neumaticoObjeto->medidas . "</td>";
        echo "<td>" . $neumaticoObjeto->precio . "</td>";
        echo "<td>" . $neumaticoObjeto->pathFoto . "</td>";
        echo "</tr>";
    }
    echo "</tbody>";
    echo "</table>";
} else {
    foreach ($arrayNeumaticos as $unNeumatico ) {
        echo $unNeumatico->toJSON();
    }
}