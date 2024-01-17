"use strict";
/// <reference path = "./clases/persona.ts" />
/// <reference path = "./clases/empleado.ts" />
/// <reference path = "./clases/fabrica.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const empleado_1 = require("./clases/empleado");
const fabrica_1 = require("./clases/fabrica");
let empleadoUno = new empleado_1.Empleado("Princess", "Peach", 12456789, "Femenino", 1548, 6000);
let empleadoDos = new empleado_1.Empleado("Pedro", "Pascal", 20425365, "Masculino", 4578, 7000);
let empleadoTres = new empleado_1.Empleado("Charles", "Chaplin", 45123852, "Masculino", 7895, 8000);
/*
console.log(empleadoUno.Hablar("Ingles"));
console.log(empleadoDos.ToString());
console.log(empleadoUno.GetDNI);
*/
let fabrica = new fabrica_1.Fabrica("Lolo");
console.log("agrego");
fabrica.AgregarEmpleado(empleadoUno);
fabrica.AgregarEmpleado(empleadoDos);
console.log(fabrica.ToString());
console.log("elimino");
fabrica.EliminarEmpleado(empleadoUno);
console.log(fabrica.ToString());
console.log("agrego");
fabrica.AgregarEmpleado(empleadoTres);
console.log(fabrica.ToString());
console.log("sueldos:");
console.log(fabrica.CalcularSueldos());
//# sourceMappingURL=main.js.map