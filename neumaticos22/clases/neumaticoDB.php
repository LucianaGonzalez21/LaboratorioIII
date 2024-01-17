<?php

namespace Gonzalez\Luciana;
require_once "neumatico.php";
require_once "IParte1.php";
require_once "IParte2.php";
require_once "IParte3.php";
require_once "IParte4.php";
require_once "accesoDatos.php";
use Gonzalez\Luciana\Neumatico;
use IParte1;
use IParte3;
use IParte4;
use PDO;
use stdClass;

class NeumaticoDB extends Neumatico implements IParte1, IParte2, IParte3, IParte4
{
    protected int $id;
    protected string $pathFoto;

    public function __construct(string $marca, string $medidas, float $precio = 0, int $id = 0, string $pathFoto = "")
    {
        parent::__construct($marca, $medidas, $precio);
        $this->id = $id;
        $this->pathFoto = $pathFoto;
    }
/*
    public function getId(){
        return $this->id;
    }

    public function getMarca(){
        return $this->marca;
    }

    public function getPrecio(){
        return $this->precio;
    }

    public function getMedidas(){
        return $this->medidas;
    }

    public function getPathFoto(){
        return $this->pathFoto;
    }
*/
    public function toJSON() : string
    {
        $obj = new stdClass();
        $obj->id = $this->id;
        $obj->marca = $this->marca;
        $obj->medidas = $this->medidas;
        $obj->precio = $this->precio;
        $obj->pathFoto = $this->pathFoto;
        
        return json_encode($obj);
    } 

    public function agregar(): bool
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO neumaticos (marca, medidas, precio, foto)"
                                                    . "VALUES(:marca, :medidas, :precio, :foto)");
        
        $consulta->bindValue(':marca', $this->marca, PDO::PARAM_STR);
        $consulta->bindValue(':medidas', $this->medidas, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $this->precio, PDO::PARAM_STR); //precio es float
        $consulta->bindValue(':foto', $this->pathFoto, PDO::PARAM_STR);

        return $consulta->execute();   
    }

    public static function traer(): array
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->retornarConsulta("SELECT * FROM neumaticos");        
        $consulta->setFetchMode(PDO::FETCH_ASSOC);                                                
        $consulta->execute();
        $neumaticosDB = array();
        while($row=$consulta->fetch()){
            array_push($neumaticosDB,new NeumaticoDB($row["marca"], $row["medidas"], $row["precio"], $row["id"], $row["foto"]));
        }
        return $neumaticosDB; 
    }

    public static function eliminar(int $id): bool
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->retornarConsulta("DELETE FROM neumaticos WHERE id = :id");
        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);

        return $consulta->execute();
    }

    public function modificar(): bool
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->retornarConsulta("UPDATE neumaticos SET marca = :marca, precio = :precio, 
                                                        medidas = :medidas, foto = :foto WHERE id = :id");
        
        $consulta->bindValue(':id', $this->id, PDO::PARAM_INT);
        $consulta->bindValue(':marca', $this->marca, PDO::PARAM_STR);
        $consulta->bindValue(':precio', $this->precio, PDO::PARAM_STR);
        $consulta->bindValue(':medidas', $this->medidas, PDO::PARAM_INT);
        $consulta->bindValue(':foto', $this->pathFoto, PDO::PARAM_STR);

        return $consulta->execute();
    }

    public function existe($arrayNeumaticos): bool
    {
        foreach ($arrayNeumaticos as $unNeumatico) {
            if($unNeumatico->marca == $this->marca && $unNeumatico->medidas == $this->medidas){
                return true;
            }
        }
        return false;
    }

    public function guardarEnArchivo(): string
    {
        $neumatico = $this->toJSON() . "\r\n";
        $neumaticoObj = json_decode($neumatico);
        $pathFoto = $neumaticoObj->pathFoto;
        $destino = "./neumaticosBorrados/" . $neumaticoObj->id . "." . $neumaticoObj->marca . "." . "borrado" . ".". date("His") . "." . pathinfo($pathFoto, PATHINFO_EXTENSION) ;

        if(rename($pathFoto, $destino)){
            $exito = true;
            $mensaje = "Se subio la foto con exito";

            $exito = false;
            $ar = fopen("./archivos/neumaticosdb_borrados.txt", "a");
            $cant = fwrite($ar, $neumatico);
    
            if($cant > 0){
                $mensaje .= "El neumatico se guardo con exito en el archivo";
                $exito = true;
            }else{
                $mensaje .= "Ocurrio un error al intentar guardar";
            }
    
            fclose($ar);

        }
        else{
            $exito = false;
            $mensaje = ". Error al mover la foto";
        }


        $obj = new stdClass();
        $obj->exito = $exito;
        $obj->mensaje = $mensaje;

        return json_encode($obj);
    }

}