
namespace Gonzalez{
    
    export class AutoFoto extends Auto{
        foto : string;

        public constructor(marca:string, patente:string, color:string, precio:number, foto:string = ""){
            super(marca, patente, color, precio);
            this.foto=foto;
        }

        public ToJSON() {
            let dato = super.ToString().slice(0,-1);
            dato += `,"pathFoto":"${this.foto}"}`;
            return JSON.parse(dato);
        }
    }
}