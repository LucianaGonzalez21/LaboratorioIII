"use strict";
var Empresa;
(function (Empresa) {
    class Persona {
        constructor(_nombre, _apellido, _dni, _sexo) {
            this._nombre = _nombre;
            this._apellido = _apellido;
            this._dni = _dni;
            this._sexo = _sexo;
        }
        get GetNombre() {
            return this._nombre;
        }
        get GetApellido() {
            return this._apellido;
        }
        get GetDNI() {
            return this._dni;
        }
        get GetSexo() {
            return this._sexo;
        }
        ToString() {
            return this._nombre + " " + this._apellido + " " + this._dni + " " + this._sexo;
        }
    }
    Empresa.Persona = Persona;
})(Empresa || (Empresa = {}));
//# sourceMappingURL=persona.js.map