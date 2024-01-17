"use strict";
var Entidades;
(function (Entidades) {
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
            return JSON.parse(this.ToString());
        }
    }
    Entidades.Auto = Auto;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Auto.js.map