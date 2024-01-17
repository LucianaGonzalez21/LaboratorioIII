"use strict";
var Gonzalez;
(function (Gonzalez) {
    class AutoFoto extends Gonzalez.Auto {
        constructor(marca, patente, color, precio, foto = "") {
            super(marca, patente, color, precio);
            this.foto = foto;
        }
        ToJSON() {
            let dato = super.ToString().slice(0, -1);
            dato += `,"pathFoto":"${this.foto}"}`;
            return JSON.parse(dato);
        }
    }
    Gonzalez.AutoFoto = AutoFoto;
})(Gonzalez || (Gonzalez = {}));
//# sourceMappingURL=AutoFoto.js.map