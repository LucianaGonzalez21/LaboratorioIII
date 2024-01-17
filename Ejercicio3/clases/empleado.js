"use strict";
var Empresa;
(function (Empresa) {
    //import { Persona } from "./persona";
    class Empleado extends Empresa.Persona {
        constructor(_nombre, _apellido, _dni, _sexo, _legajo, _sueldo) {
            super(_nombre, _apellido, _dni, _sexo);
            this._legajo = _legajo;
            this._sueldo = _sueldo;
        }
        get GetSueldo() {
            return this._sueldo;
        }
        get GetLegajo() {
            return this._legajo;
        }
        Hablar(idioma) {
            return "El empleado habla " + idioma;
        }
        ToString() {
            return super.ToString() + " " + this._legajo + " " + this._sueldo;
        }
    }
    Empresa.Empleado = Empleado;
})(Empresa || (Empresa = {}));
//# sourceMappingURL=empleado.js.map