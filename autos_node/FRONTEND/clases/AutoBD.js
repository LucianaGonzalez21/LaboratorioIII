"use strict";
/// <reference path="Auto.ts" />;
var Entidades;
(function (Entidades) {
    class AutoBD extends Entidades.Auto {
        constructor(marca, patente, color, precio, pathFoto = "") {
            super(marca, patente, color, precio);
            this.pathFoto = pathFoto;
        }
        ToJSON() {
            let dato = super.ToString().slice(0, -1);
            dato += `,"pathFoto":"${this.pathFoto}"}`;
            return JSON.parse(dato);
        }
    }
    Entidades.AutoBD = AutoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=AutoBD.js.map