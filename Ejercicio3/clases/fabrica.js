"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fabrica = void 0;
class Fabrica {
    constructor(_razonSocial) {
        this._empleados = [];
        this._razonSocial = _razonSocial;
    }
    EmpleadoExiste(persona) {
        let indice = -1;
        for (let i = 0; i < this._empleados.length; i++) {
            if (this._empleados[i].GetDNI == persona.GetDNI) {
                indice = i;
                break;
            }
        }
        return indice;
    }
    AgregarEmpleado(persona) {
        if (this.EmpleadoExiste(persona) == -1) {
            this._empleados.push(persona);
            return true;
        }
        return false;
    }
    EliminarEmpleado(persona) {
        let indice = this.EmpleadoExiste(persona);
        if (indice >= 0) {
            this._empleados.splice(indice, 1);
            return true;
        }
        return false;
    }
    CalcularSueldos() {
        let sumaSueldosTotales = 0;
        for (let i = 0; i < this._empleados.length; i++) {
            sumaSueldosTotales += this._empleados[i].GetSueldo;
        }
        if (this._empleados.length > 0) {
            return sumaSueldosTotales / this._empleados.length;
        }
        return 0;
    }
    ToString() {
        let texto;
        texto = this._razonSocial + "\n";
        this._empleados.forEach(empleado => {
            texto += empleado.ToString() + "\n";
        });
        return texto;
    }
}
exports.Fabrica = Fabrica;
//# sourceMappingURL=fabrica.js.map