"use strict";
/// <reference path="Auto.ts" />
/// <reference path="AutoFoto.ts" />
var RecPrimerParcial;
(function (RecPrimerParcial) {
    const URL_API = "http://localhost:2023/";
    let xhttp = new XMLHttpRequest();
    class Manejadora {
        static AgregarAutoBD() {
            let marca = document.getElementById("marca").value;
            let patente = document.getElementById("patente").value;
            let color = document.getElementById("color").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let auto = new Gonzalez.Auto(marca, patente, color, precio);
            let autoJSON = auto.ToJSON();
            xhttp.open("POST", URL_API + "agregarAutoBD", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(autoJSON));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    this.ListarAutosBD();
                }
            };
        }
        static ListarAutosBD() {
            xhttp.open("GET", URL_API + "listarAutosBD", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let neumaticos_objeto_array = JSON.parse(xhttp.responseText);
                    let div = document.getElementById("divTabla");
                    let tabla = `<table>
                                    <tr>
                                        <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th><th>ACCION</th>
                                    </tr>`;
                    for (let index = 0; index < neumaticos_objeto_array.length; index++) {
                        const dato = neumaticos_objeto_array[index];
                        tabla += `<tr><td>${dato.patente}</td><td>${dato.marca}</td><td><input type="color" disabled value="${dato.color}"></td><td>${dato.precio}</td>
                                    <td><input type="button" id="" data-obj='${JSON.stringify(dato)}' 
                                        value="Modificar" name="btnModificar"></td>
                                        <td><input type="button" id="" data-obj='${JSON.stringify(dato)}' 
                                        value="Eliminar" name="btnEliminar"></td>
                                        </tr>`;
                    }
                    tabla += `</table>`;
                    div.innerHTML = tabla;
                    this.AsignarManejadoresAutosSinFoto();
                }
            };
        }
        static AsignarManejadoresAutosSinFoto() {
            if (window.location.href == "http://localhost/Gonzalez.Luciana.parte2/auto_bd.html") {
                document.getElementsByName("btnEliminar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { new Manejadora().EliminarAutoBD(elemento.getAttribute("data-obj")); });
                });
                document.getElementsByName("btnModificar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { this.ObtenerModificarAutoSinFoto(elemento); });
                });
            }
        }
        static ObtenerModificarAutoSinFoto(dato) {
            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            document.getElementById("marca").value = obj_dato.marca;
            document.getElementById("color").value = obj_dato.color;
            document.getElementById("patente").value = obj_dato.patente;
            document.getElementById("precio").value = obj_dato.precio;
        }
        static ModificarAuto() {
            let marca = document.getElementById("marca").value;
            let patente = document.getElementById("patente").value;
            let color = document.getElementById("color").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let dato = {
                "marca": marca,
                "patente": patente,
                "color": color,
                "precio": precio
            };
            xhttp.open("POST", URL_API + "modificarAutoBD", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(dato));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.ListarAutosBD();
                }
            };
        }
        EliminarAutoBD(dato) {
            let autoJSON = JSON.parse(dato);
            let mensaje = "Desea eliminar el auto " + autoJSON.marca + " con patente " + autoJSON.patente + "?";
            let respuesta = window.confirm(mensaje);
            if (respuesta) {
                xhttp.open("POST", URL_API + "eliminarAutoBD", true);
                xhttp.setRequestHeader("content-type", "application/json");
                xhttp.send(JSON.stringify(autoJSON));
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                        Manejadora.ListarAutosBD();
                    }
                };
            }
            else {
                alert("Se cancelo la eliminacion del auto");
            }
        }
    }
    RecPrimerParcial.Manejadora = Manejadora;
})(RecPrimerParcial || (RecPrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map