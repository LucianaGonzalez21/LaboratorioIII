<?php

if(isset($_POST["numero"]))
{
    $numero = (int)$_POST["numero"];
    $cantidadImpares = 0;

    for ($i = 0; $i < $numero; $i++) {
        if ($i % 2 != 0) {
            $cantidadImpares += 1;
        }
    }
    echo $cantidadImpares;
}
