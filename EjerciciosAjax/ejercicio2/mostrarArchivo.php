<?php

if (isset($_POST["path"])) {
    $path = $_POST["path"];
    if (file_exists($path)) {
        $ar = fopen($path, "r");
        while (!feof($ar)) {
            echo fgets($ar);
        }
        fclose(($ar));
    }
}
