<?php

namespace Gonzalez;

class Alumno
{
    public string $nombre;
    public string $apellido;
    public int $legajo;

    public function __construct(string $nombre, string $apellido, int $legajo)
    {
        $this->nombre = $nombre;
        $this->apellido = $apellido;
        $this->legajo = $legajo;
    }

    public static function Agregar(Alumno $obj): bool
    {
        $retorno = false;

        //ABRO EL ARCHIVO
        $ar = fopen("./archivos/alumnos.txt", "a"); //append (si no existe, lo crea)

        if (Alumno::Verificar($obj->legajo) == false) {
            //ESCRIBO EN EL ARCHIVO CON FORMATO: CLAVE-VALOR_UNO-VALOR_DOS
            $cant = fwrite($ar, "{$obj->legajo} - {$obj->nombre} - {$obj->apellido}\r\n");

            if ($cant > 0) {
                $retorno = true;
            }

            //CIERRO EL ARCHIVO
            fclose($ar);
        } else {
            echo "El alumno con legajo " . $obj->legajo . " ya se encuentra en el listado";
        }
        return $retorno;
    }

    public static function Listar(): string
    {
        $retorno = "";

        //ABRO EL ARCHIVO
        $ar = fopen("./archivos/alumnos.txt", "r");

        //LEO LINEA POR LINEA DEL ARCHIVO
        while (!feof($ar)) {
            $retorno .= fgets($ar) . "</br>";
        }

        //CIERRO EL ARCHIVO
        fclose($ar);

        return $retorno;
    }

    public static function Modificar(Alumno $obj): bool
    {
        $retorno = false;


        if (Alumno::Verificar($obj->legajo)) {
            $elementos = array();

            //ABRO EL ARCHIVO
            $ar = fopen("./archivos/alumnos.txt", "r");

            while (!feof($ar)) {
                $linea = fgets($ar);

                $array_linea = explode("-", $linea);

                //$array_linea[2] = trim($array_linea[2]); //legajo
                $array_linea[0] = trim($array_linea[0]);


                //if(isset($array_linea[2]) && trim($array_linea[2]) != "")
                if ($array_linea[0] != "") {
                    //RECUPERO LOS CAMPOS
                    $legajo_archivo = trim($array_linea[0]);
                    $nombre_archivo = trim($array_linea[1]);
                    $apellido_archivo = trim($array_linea[2]);

                    if ($legajo_archivo == $obj->legajo) {
                        array_push($elementos, "{$legajo_archivo} - {$obj->nombre} - {$obj->apellido}\r\n");
                    } else {
                        array_push($elementos, "{$legajo_archivo} - {$nombre_archivo} - {$apellido_archivo}\r\n");
                    }
                }
            }

            //CIERRO EL ARCHIVO
            fclose($ar);

            //ABRO EL ARCHIVO
            $ar = fopen("./archivos/alumnos.txt", "w");

            $cant = 0;

            //ESCRIBO EN EL ARCHIVO
            foreach ($elementos as $item) {
                $cant = fwrite($ar, $item);
            }

            if ($cant > 0) {
                echo "<h2> registro MODIFICADO </h2><br/>";
            }

            //CIERRO EL ARCHIVO
            fclose($ar);
        } else {
            echo "El alumno con legajo " . $obj->legajo . " no se encuentra en el listado";
        }

        return $retorno;
    }

    public static function Borrar(int $clave): bool
    {
        $retorno = false;


        if (Alumno::Verificar($clave)) {

            $elementos = array();
            //ABRO EL ARCHIVO
            $ar = fopen("./archivos/alumnos.txt", "r");

            while (!feof($ar)) {
                $linea = fgets($ar);
                $array_linea = explode("-", $linea);

                $array_linea[0] = trim($array_linea[0]);

                //if(isset($array_linea[2]) && trim($array_linea[2]) != "")
                if ($array_linea[0] != "") {
                    //RECUPERO LOS CAMPOS
                    $legajo_archivo = trim($array_linea[0]);
                    $nombre_archivo = trim($array_linea[1]);
                    $apellido_archivo = trim($array_linea[2]);

                    if ($legajo_archivo == $clave) {
                        continue;
                    }

                    array_push($elementos, "{$legajo_archivo} - {$nombre_archivo} - {$apellido_archivo}\r\n");
                }
            }

            //CIERRO EL ARCHIVO
            fclose($ar);

            //ABRO EL ARCHIVO
            $ar = fopen("./archivos/alumnos.txt", "w");

            $cant = 0;

            //ESCRIBO EN EL ARCHIVO
            foreach ($elementos as $item) {
                $cant = fwrite($ar, $item);
            }

            if ($cant > 0) {
                echo "<h2> registro BORRADO </h2><br/>";
            }

            //CIERRO EL ARCHIVO
            fclose($ar);
        } else {
            echo "El alumno con legajo " . $clave . " no se encuentra en el listado";
        }

        return $retorno;
    }

    public static function Verificar(int $clave)
    {

        $archivo = fopen("./archivos/alumnos.txt", "r");
        $retorno = false;

        while (!feof($archivo)) {
            $linea = fgets($archivo);
            $array_linea = explode("-", $linea);
            $array_linea[0] = trim($array_linea[0]);

            if ($array_linea[0] != "") {
                $legajo_archivo = trim($array_linea[0]);

                if ($legajo_archivo == $clave) {
                    $retorno = true;
                    break;
                }
            }
        }
        fclose($archivo);
        return $retorno;
    }
}
