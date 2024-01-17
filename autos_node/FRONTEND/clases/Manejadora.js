"use strict";
/// <reference path="Auto.ts" />
/// <reference path="AutoBD.ts" />
/// <reference path="IParte2.ts" />
/// <reference path="IParte3.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    const URL_API = "http://localhost:9876/";
    let xhttp = new XMLHttpRequest();
    /*window.addEventListener("load", () => {
        if (window.location.href == "http://localhost/autos_node/neumatico_bd.html") {
            Manejadora.MostrarNeumaticosBD();
        }
    });*/
    class Manejadora {
        static Limpiar() {
            document.getElementById("txtMarca_Archivo").value = "";
            document.getElementById("txtPatente_Archivo").value = "";
            document.getElementById("txtColor_Archivo").value = "";
            document.getElementById("txtPrecio_Archivo").value = "";
        }
        static LimpiarFoto() {
            //(<HTMLInputElement>document.getElementById("foto"));
        }
        static AgregarAutoJSON() {
            let marca = document.getElementById("txtMarca_Archivo").value;
            let patente = document.getElementById("txtPatente_Archivo").value;
            let color = document.getElementById("txtColor_Archivo").value;
            let precio = parseFloat(document.getElementById("txtPrecio_Archivo").value);
            let auto = new Entidades.Auto(marca, patente, color, precio);
            let autoJSON = auto.ToJSON();
            xhttp.open("POST", URL_API + "autos", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(autoJSON));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    this.MostrarAutosJSON();
                }
            };
        }
        static MostrarAutosJSON() {
            xhttp.open("GET", URL_API + "autos", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let autos_string_array = JSON.parse(xhttp.responseText);
                    let autos_objeto_array = [];
                    autos_string_array.forEach((obj_str) => {
                        if (obj_str !== "") {
                            autos_objeto_array.push(JSON.parse(obj_str));
                        }
                    });
                    let div = document.getElementById("divTabla");
                    let tabla = `<table>
                                    <tr>
                                        <th>MARCA</th><th>PATENTE</th><th>COLOR</th><th>PRECIO</th>
                                    </tr>`;
                    for (let index = 0; index < autos_objeto_array.length; index++) {
                        const dato = autos_objeto_array[index];
                        tabla += `<tr><td>${dato.marca}</td><td>${dato.patente}</td><td>${dato.color}</td><td>${dato.precio}</td></tr>`;
                    }
                    tabla += `</table>`;
                    div.innerHTML = tabla;
                    this.Limpiar();
                }
            };
        }
        static VerificarAutoJSON() {
            let patente = document.getElementById("txtPatente_Archivo").value;
            let dato = {
                "patente": patente,
            };
            xhttp.open("POST", URL_API + "autos/verificar", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(dato));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                }
            };
        }
        static ModificarAutoJSON() {
            let marca = document.getElementById("txtMarca_Archivo").value;
            let patente = document.getElementById("txtPatente_Archivo").value;
            let color = document.getElementById("txtColor_Archivo").value;
            let precio = parseFloat(document.getElementById("txtPrecio_Archivo").value);
            let auto = new Entidades.Auto(marca, patente, color, precio);
            let autoJSON = auto.ToJSON();
            xhttp.open("POST", URL_API + "autos/modificar", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(autoJSON));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    this.MostrarAutosJSON();
                }
            };
        }
        static AgregarAutoSinFoto() {
            let marca = document.getElementById("txtMarcaBD").value;
            let patente = document.getElementById("txtPatenteBD").value;
            let color = document.getElementById("txtColorBD").value;
            let precio = parseFloat(document.getElementById("txtPrecioBD").value);
            let auto = new Entidades.Auto(marca, patente, color, precio);
            let autoJSON = auto.ToJSON();
            xhttp.open("POST", URL_API + "auto_bd_sinFoto", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(autoJSON));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    this.MostrarAutosBD();
                }
            };
        }
        static MostrarAutosBD() {
            xhttp.open("GET", URL_API + "auto_bd_sinFoto", true);
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
                        let rutaImagen = URL_API + dato.foto;
                        tabla += `<tr><td>${dato.patente}</td><td>${dato.marca}</td><td>${dato.color}</td><td>${dato.precio}</td>
                                    <td>${dato.foto}</td>
                                    <td><img src='${rutaImagen}' width=50 height=50></img></td> 
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
            if (window.location.href == "http://localhost/autos_node/autoBD.html") {
                document.getElementsByName("btnEliminar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { new Manejadora().BorrarAutoFoto(elemento.getAttribute("data-obj")); });
                });
                document.getElementsByName("btnModificar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { this.ObtenerModificarAutosConFoto(elemento); });
                });
            }
            else {
                document.getElementsByName("btnEliminar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { new Manejadora().EliminarAuto(elemento.getAttribute("data-obj")); });
                });
                document.getElementsByName("btnModificar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { this.ObtenerModificarAutoSinFoto(elemento); });
                });
            }
        }
        static ObtenerModificarAutoSinFoto(dato) {
            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            document.getElementById("txtIdBD").value = obj_dato.id;
            document.getElementById("txtMarcaBD").value = obj_dato.marca;
            document.getElementById("txtColorBD").value = obj_dato.color;
            document.getElementById("txtPatenteBD").value = obj_dato.patente;
            document.getElementById("txtPrecioBD").value = obj_dato.precio;
        }
        static ObtenerModificarAutosConFoto(dato) {
            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            document.getElementById("txtIdBD").value = obj_dato.id;
            document.getElementById("txtMarcaBD").value = obj_dato.marca;
            document.getElementById("txtColorBD").value = obj_dato.color;
            document.getElementById("txtPatenteBD").value = obj_dato.patente;
            document.getElementById("txtPrecioBD").value = obj_dato.precio;
            document.getElementById("imgFoto").src = URL_API + "/" + obj_dato.foto;
        }
        /************PARTE 2*******/
        ModificarAuto() {
            let marca = document.getElementById("txtMarcaBD").value;
            let id = document.getElementById("txtIdBD").value;
            let patente = document.getElementById("txtPatenteBD").value;
            let color = document.getElementById("txtColorBD").value;
            let precio = parseFloat(document.getElementById("txtPrecioBD").value);
            let dato = {
                "marca": marca,
                "id": id,
                "patente": patente,
                "color": color,
                "precio": precio
            };
            xhttp.open("POST", URL_API + "auto_bd_sinFoto/modificar", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(dato));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.MostrarAutosBD();
                }
            };
        }
        EliminarAuto(dato) {
            let autoJSON = JSON.parse(dato);
            let mensaje = "Desea eliminar el auto " + autoJSON.marca + " con patente " + autoJSON.patente + "?";
            let respuesta = window.confirm(mensaje);
            if (respuesta) {
                xhttp.open("POST", URL_API + "auto_bd_sinFoto/eliminar", true);
                xhttp.setRequestHeader("content-type", "application/json");
                xhttp.send(JSON.stringify(autoJSON));
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                        Manejadora.MostrarAutosBD();
                    }
                };
            }
            else {
                alert("Se cancelo la eliminacion del auto");
            }
        }
        /*************PARTE 3************* */
        VerificarAutoBD() {
            xhttp.open("POST", URL_API + "auto_bd/verificar", true);
            let neumatico = JSON.stringify({ "marca": document.getElementById("txtMarcaBD").value, "patente": document.getElementById("txtPatenteBD").value });
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(neumatico);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let respuesta = xhttp.responseText;
                    if (respuesta != "") {
                        respuesta = respuesta.slice(1, -1);
                        let autoVerificado = JSON.parse(respuesta);
                        let tabla = "<table><thead><tr><td>ID</td><td>MARCA</td><td>PATENTE</td><td>COLOR</td><td>PRECIO</td></tr></thead><tbody>";
                        tabla += "<tr><td>" + autoVerificado.id + "</td><td>" + autoVerificado.marca + "</td><td>" + autoVerificado.patente + "</td><td>" + autoVerificado.color + "</td><td>" + autoVerificado.precio + "</td><td>" + "</tr>";
                        tabla += "</tbody></table>";
                        document.getElementById("divInfo").innerHTML = tabla;
                        console.log("Auto existe");
                    }
                    else {
                        console.log("No se encontro el auto");
                    }
                }
            };
        }
        AgregarAutoFoto() {
            let marca = document.getElementById("txtMarcaBD").value;
            let patente = document.getElementById("txtPatenteBD").value;
            let color = document.getElementById("txtColorBD").value;
            let precio = parseFloat(document.getElementById("txtPrecioBD").value);
            let foto = document.getElementById("foto");
            //let auto: Entidades.AutoBD = new Entidades.AutoBD(marca,patente,color,precio);
            //let autoJSON = auto.ToJSON();
            let dato = {
                "marca": marca,
                "patente": patente,
                "color": color,
                "precio": precio
            };
            let form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('obj', JSON.stringify(dato));
            xhttp.open("POST", URL_API + "auto_bd", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form); //`{"codigo":${codigo}, "marca":${marca}, "precio":${precio}}`
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.MostrarAutosBD();
                }
            };
        }
        BorrarAutoFoto(dato) {
            let autoJSON = JSON.parse(dato);
            let mensaje = "Desea eliminar el auto " + autoJSON.marca + " con patente " + autoJSON.patente + "?";
            let respuesta = window.confirm(mensaje);
            if (respuesta) { //confirma eliminacion
                xhttp.open("POST", URL_API + "auto_bd/eliminar", true);
                xhttp.setRequestHeader("content-type", "application/json");
                xhttp.send(JSON.stringify(autoJSON));
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                        Manejadora.MostrarAutosBD();
                    }
                };
            }
            else {
                alert("Se cancelo la eliminacion del auto");
            }
        }
        ModificarAutoBDFoto() {
            let marca = document.getElementById("txtMarcaBD").value;
            let id = document.getElementById("txtIdBD").value;
            let patente = document.getElementById("txtPatenteBD").value;
            let color = document.getElementById("txtColorBD").value;
            let precio = parseFloat(document.getElementById("txtPrecioBD").value);
            let foto = document.getElementById("foto");
            //let neumatico: Entidades.NeumaticoBD = new Entidades.NeumaticoBD(marca, medidas, precio, id);
            //let neumatico_json: any = neumatico.ToJSON();
            let dato = {
                "marca": marca,
                "patente": patente,
                "color": color,
                "precio": precio,
                "id": id
            };
            let form = new FormData();
            form.append('foto', foto.files[0]);
            form.append('obj', JSON.stringify(dato));
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", URL_API + "auto_bd/modificar", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.MostrarAutosBD();
                }
            };
        }
    }
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=Manejadora.js.map