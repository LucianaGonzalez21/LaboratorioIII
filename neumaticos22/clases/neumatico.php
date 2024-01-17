<?php

namespace Gonzalez\Luciana;

use stdClass;

class Neumatico
{
    protected string $marca;
    protected string $medidas;
    protected float $precio;

    public function __construct(string $marca, string $medidas, float $precio = 0)
    {
        $this->marca = $marca;
        $this->medidas = $medidas;
        $this->precio = $precio;
    }

    public function toJSON() : string
    {
        $obj = new stdClass();
        $obj->marca = $this->marca;
        $obj->medidas = $this->medidas;
        $obj->precio = $this->precio;
        return json_encode($obj);
    } 

    public function guardarJSON(string $path){
        $exito = false;
        
        $neumatico = $this->toJSON() . "\r\n";
        $ar = fopen($path, "a");
        $cant = fwrite($ar, $neumatico);

        if($cant > 0){
            $mensaje = "El neumatico se guardo con exito en el archivo";
            $exito = true;
        }else{
            $mensaje = "Ocurrio un error al intentar guardar";
        }

        fclose($ar);

        $obj = new stdClass();
        $obj->exito = $exito;
        $obj->mensaje = $mensaje;

        return json_encode($obj);
    }

    public static function traerJSON($path){
        $arrayNeumaticos = array();
        $ar = fopen($path, "r");

        while(!feof($ar)){
            $linea = fgets($ar);
            $linea = trim($linea);
            $neumatico = json_decode($linea); //objeto neumatico

            array_push($arrayNeumaticos, $neumatico);
        }

        fclose($ar);

        return $arrayNeumaticos;
    }

    public static function verificarNeumaticoJSON(Neumatico $neumatico){
        $arrayNeumaticos = self::traerJSON("./archivos/neumaticos.json");
        $acumuladorPrecios = 0;
        $exito = false;
        $obj = new stdClass();

        foreach ($arrayNeumaticos as $unNeumatico) {
            if($unNeumatico != ""){
                if($unNeumatico->medidas == $neumatico->medidas && $unNeumatico->marca == $neumatico->marca){
                     $exito = true;
                     $acumuladorPrecios += $unNeumatico->precio;
                }
            }
        }

        if($exito){
            $obj->mensaje = "Sumatoria de precios de neumaticos con la misma marca y medidas: " . $acumuladorPrecios;
        }else{
            $obj->mensaje = "No existe tal neumatico";
        }

        $obj->exito = $exito;

        return json_encode($obj);        
    }
}
