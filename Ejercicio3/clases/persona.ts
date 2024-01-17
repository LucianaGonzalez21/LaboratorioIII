
namespace Empresa{
    
    export abstract class Persona
    {
        private _nombre : string;
        private _apellido : string;
        private _dni : number;
        private _sexo : string;


        public constructor (_nombre : string, _apellido : string, _dni : number, _sexo : string)
        {
            this._nombre = _nombre;
            this._apellido = _apellido;
            this._dni = _dni;
            this._sexo = _sexo;
        }

        public get GetNombre() : string
        {
            return this._nombre;
        }

        public get GetApellido() : string
        {
            return this._apellido;
        }

        public get GetDNI() : number
        {
            return this._dni;
        }

        public get GetSexo() :string
        {
            return this._sexo;
        }

        public abstract Hablar(idioma : string) : string 

        public ToString()
        {
            return this._nombre + " " + this._apellido + " " + this._dni + " " + this._sexo;
        }

    }
}