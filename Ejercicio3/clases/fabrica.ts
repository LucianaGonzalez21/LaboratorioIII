//import { Empleado } from "./empleado";

/// <reference path="./empleado.ts" />
export class Fabrica
{
    private _empleados : Empleado[];
    private _razonSocial : string;

    public constructor(_razonSocial:string)
    {
        this._empleados = [];
        this._razonSocial = _razonSocial;
    }

    private EmpleadoExiste(persona:Empleado):number
    {
        let indice = -1;
        for(let i=0; i < this._empleados.length; i++)
        {
            if(this._empleados[i].GetDNI == persona.GetDNI)
            {
                indice = i;
                break;
            }
        }
        return indice;
    }

    public AgregarEmpleado(persona:Empleado):boolean
    {
        if(this.EmpleadoExiste(persona) == -1)
        {
            this._empleados.push(persona);
            return true;
        }
        return false;
    }

    public EliminarEmpleado(persona:Empleado):boolean
    {
        let indice : number = this.EmpleadoExiste(persona);
        if(indice >= 0)
        {
            this._empleados.splice(indice, 1);
            return true;
        }
        return false;
    }

    public CalcularSueldos() : number
    {
        let sumaSueldosTotales : number = 0;

        for(let i=0; i<this._empleados.length;i++)
        {
            sumaSueldosTotales += this._empleados[i].GetSueldo;
        }

        if(this._empleados.length>0)
        {
            return sumaSueldosTotales/this._empleados.length;
        }
        return 0;
    }

    public ToString() : string
    {
        let texto:string;

        texto = this._razonSocial + "\n";

        this._empleados.forEach(empleado =>
            {
                texto += empleado.ToString() + "\n";
            })

        return texto;
    }
}