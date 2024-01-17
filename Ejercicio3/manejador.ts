/// <reference path="./clases/persona.ts" />
/// <reference path="./clases/empleado.ts" />

//import { Empleado } from "./clases/empleado";

namespace Manejador
{
    export function CrearEmpleado():void
    {
        let nombre:string=(<HTMLInputElement>document.getElementById("txtNombre")).value;
        let apellido:string=(<HTMLInputElement>document.getElementById("txtApellido")).value;
        let dni:number=parseInt((<HTMLInputElement>document.getElementById("txtDni")).value);
        let sexo:string=(<HTMLInputElement>document.getElementById("txtSexo")).value;
        let sueldo:number=parseInt((<HTMLInputElement>document.getElementById("txtSueldo")).value);
        let legajo:number=parseInt((<HTMLInputElement>document.getElementById("txtLegajo")).value);

        if(nombre.length>0)
        {
            let nuevoEmpleado = new Empresa.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);
            alert("Empleado: " + nuevoEmpleado.ToString());
        }
        else
        {
            window.location.href="http://localhost/Laboratorio%20III/Ejercicio3/administracion.php";
        }
    }
}