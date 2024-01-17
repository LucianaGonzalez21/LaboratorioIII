<?php
$existe = false;
$palabra = isset($_POST["palabra"])? $_POST["palabra"] : null;

if (isset($_POST["path"])) {
    $path = $_POST["path"];
    if (file_exists($path)) {
        $ar = fopen($path, "r");
        while (!feof($ar)) {
            $arrayLinea = explode(" ", fgets($ar));
            foreach ($arrayLinea as $unaPalabra) {
                $unaPalabra = trim($unaPalabra);
                if ($palabra != null && $palabra == $unaPalabra) {
                    $existe = true;
                    break;
                }
            }
            if ($existe) break;
        }
        fclose(($ar));
        if ($existe) {
            echo "La palabra se encuentra en el archivo";
        } else {
            echo "La palabra no se encuentra en el archivo";
        }
    }
}
