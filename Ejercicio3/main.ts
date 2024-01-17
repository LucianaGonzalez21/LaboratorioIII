/// <reference path = "./clases/persona.ts" />
/// <reference path = "./clases/empleado.ts" />
/// <reference path = "./clases/fabrica.ts" />

import { Empleado } from "./clases/empleado";
import { Fabrica } from "./clases/fabrica";


let empleadoUno : Empleado = new Empleado("Princess", "Peach", 12456789, "Femenino", 1548, 6000);
let empleadoDos : Empleado = new Empleado("Pedro", "Pascal", 20425365, "Masculino", 4578, 7000);
let empleadoTres : Empleado = new Empleado("Charles", "Chaplin", 45123852, "Masculino", 7895, 8000);

/*
console.log(empleadoUno.Hablar("Ingles"));
console.log(empleadoDos.ToString());
console.log(empleadoUno.GetDNI);
*/

let fabrica : Fabrica = new Fabrica("Lolo");

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