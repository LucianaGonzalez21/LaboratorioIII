namespace Gonzalez{

    export class Auto{
        patente : string;
        marca : string;
        color : string;
        precio : number;

        public constructor(marca:string, patente:string, color:string, precio:number) {
            this.marca=marca;
            this.patente=patente;
            this.color=color;
            this.precio=precio;
        }

        public ToString(){
            return `{"marca":"${this.marca}","patente":"${this.patente}","color":"${this.color}","precio":${this.precio}}`;
        }

        public ToJSON(){
            let dato = `{"marca":"${this.marca}","patente":"${this.patente}","color":"${this.color}","precio":${this.precio}}`;
            return JSON.parse(this.ToString());
        }
    }
}