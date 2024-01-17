/// <reference path="Auto.ts" />
/// <reference path="AutoFoto.ts" />

namespace RecPrimerParcial {
    const URL_API: string = "http://localhost:2023/";
    let xhttp: XMLHttpRequest = new XMLHttpRequest();

    export class Manejadora {

        public static AgregarAutoBD() {
            let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("patente")).value;
            let color: string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
            let auto: Gonzalez.Auto = new Gonzalez.Auto(marca, patente, color, precio);
            let autoJSON: any = auto.ToJSON();

            xhttp.open("POST", URL_API + "agregarAutoBD", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(autoJSON));

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    this.ListarAutosBD();
                }
            };
        }
        

        public static ListarAutosBD() {
            xhttp.open("GET", URL_API + "listarAutosBD", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let neumaticos_objeto_array: any[] = JSON.parse(xhttp.responseText);
                    let div = <HTMLDivElement>document.getElementById("divTabla");
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

        public static AsignarManejadoresAutosSinFoto() {

            if (window.location.href == "http://localhost/Gonzalez.Luciana.parte2/auto_bd.html") {
                document.getElementsByName("btnEliminar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { new Manejadora().EliminarAutoBD(elemento.getAttribute("data-obj")!) });
                });
                document.getElementsByName("btnModificar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { this.ObtenerModificarAutoSinFoto(elemento) });
                });
            }
        }

        public static ObtenerModificarAutoSinFoto(dato: any) {

            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            (<HTMLInputElement>document.getElementById("marca")).value = obj_dato.marca;
            (<HTMLInputElement>document.getElementById("color")).value = obj_dato.color;
            (<HTMLInputElement>document.getElementById("patente")).value = obj_dato.patente;
            (<HTMLInputElement>document.getElementById("precio")).value = obj_dato.precio;
        }

        public static ModificarAuto() {

            let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("patente")).value;
            let color: string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
            let dato = {
                "marca":marca,
                "patente":patente,
                "color":color,
                "precio":precio
            };
            xhttp.open("POST", URL_API + "modificarAutoBD", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(dato));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.ListarAutosBD();
                }
            };
        }

        public EliminarAutoBD(dato: any) {
            let autoJSON = JSON.parse(dato);
            let mensaje: string = "Desea eliminar el auto " + autoJSON.marca + " con patente " + autoJSON.patente + "?";
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
                }
            } else {
                alert("Se cancelo la eliminacion del auto");
            }
        }

       
    }
}