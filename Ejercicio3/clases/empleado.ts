namespace Empresa
{
    //import { Persona } from "./persona";
    
    export class Empleado extends Persona
    {
        private _legajo : number;
        private _sueldo : number;
    
        public constructor(_nombre:string, _apellido:string, _dni:number, _sexo:string, _legajo:number, _sueldo:number)
        {
            super(_nombre, _apellido, _dni, _sexo);
            this._legajo = _legajo;
            this._sueldo = _sueldo;
        }
    
        public get GetSueldo() : number
        {
            return this._sueldo;
        }
    
        public get GetLegajo() : number
        {
            return this._legajo;
        }
    
        public Hablar(idioma: string): string {
            return "El empleado habla " + idioma;
        }
    
        public ToString(): string {
            return super.ToString() + " " + this._legajo + " " + this._sueldo;
        }
    }
}


