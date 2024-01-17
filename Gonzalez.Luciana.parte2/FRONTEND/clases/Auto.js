"use strict";
var Gonzalez;
(function (Gonzalez) {
    class Auto {
        constructor(marca, patente, color, precio) {
            this.marca = marca;
            this.patente = patente;
            this.color = color;
            this.precio = precio;
        }
        ToString() {
            return `{"marca":"${this.marca}","patente":"${this.patente}","color":"${this.color}","precio":${this.precio}}`;
        }
        ToJSON() {
            let dato = `{"marca":"${this.marca}","patente":"${this.patente}","color":"${this.color}","precio":${this.precio}}`;
            return JSON.parse(this.ToString());
        }
    }
    Gonzalez.Auto = Auto;
})(Gonzalez || (Gonzalez = {}));
//# sourceMappingURL=Auto.js.map