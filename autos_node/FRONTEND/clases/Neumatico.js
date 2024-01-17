"use strict";
var Entidades;
(function (Entidades) {
    var Neumatico = (function () {
        function Neumatico(marca, medidas, precio) {
            this.marca = marca;
            this.medidas = medidas;
            this.precio = precio;
        }
        Neumatico.prototype.ToString = function () {
            return "{\"marca\":\"".concat(this.marca, "\",\"medidas\":\"").concat(this.medidas, "\",\"precio\":").concat(this.precio, "}");
        };
        Neumatico.prototype.ToJSON = function () {
            return JSON.parse(this.ToString());
        };
        return Neumatico;
    }());
    Entidades.Neumatico = Neumatico;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Neumatico.js.map