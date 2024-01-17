/// <reference path="Auto.ts" />;
namespace Entidades{
    
    export class AutoBD extends Auto{
        pathFoto : string;

        public constructor(marca:string, patente:string, color:string, precio:number, pathFoto:string = ""){
            super(marca, patente, color, precio);
            this.pathFoto=pathFoto;
        }

        public ToJSON() {
            let dato = super.ToString().slice(0,-1);
            dato += `,"pathFoto":"${this.pathFoto}"}`;
            return JSON.parse(dato);
        }
    }
}