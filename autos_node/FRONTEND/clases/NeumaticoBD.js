"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var NeumaticoBD = (function (_super) {
        __extends(NeumaticoBD, _super);
        function NeumaticoBD(marca, medidas, precio, id, pathFoto) {
            if (id === void 0) { id = 0; }
            if (pathFoto === void 0) { pathFoto = ""; }
            var _this = _super.call(this, marca, medidas, precio) || this;
            _this.id = id;
            _this.pathFoto = pathFoto;
            return _this;
        }
        NeumaticoBD.prototype.ToJSON = function () {
            var dato = _super.prototype.ToString.call(this).slice(0, -1);
            dato += ",\"id\":".concat(this.id, ",\"foto\":\"").concat(this.pathFoto, "\"}");
            return JSON.parse(dato);
        };
        return NeumaticoBD;
    }(Entidades.Neumatico));
    Entidades.NeumaticoBD = NeumaticoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=NeumaticoBD.js.map