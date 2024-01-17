"use strict";
/// <reference path="./clases/persona.ts" />
/// <reference path="./clases/empleado.ts" />
//import { Empleado } from "./clases/empleado";
var Manejador;
(function (Manejador) {
    function CrearEmpleado() {
        let nombre = document.getElementById("txtNombre").value;
        let apellido = document.getElementById("txtApellido").value;
        let dni = parseInt(document.getElementById("txtDni").value);
        let sexo = document.getElementById("txtSexo").value;
        let sueldo = parseInt(document.getElementById("txtSueldo").value);
        let legajo = parseInt(document.getElementById("txtLegajo").value);
        if (nombre.length > 0) {
            let nuevoEmpleado = new Empresa.Empleado(nombre, apellido, dni, sexo, legajo, sueldo);
            alert("Empleado: " + nuevoEmpleado.ToString());
        }
        else {
            window.location.href = "http://localhost/Laboratorio%20III/Ejercicio3/administracion.php";
        }
    }
    Manejador.CrearEmpleado = CrearEmpleado;
})(Manejador || (Manejador = {}));
//# sourceMappingURL=manejador.js.map