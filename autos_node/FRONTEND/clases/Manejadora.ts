/// <reference path="Auto.ts" />
/// <reference path="AutoBD.ts" />
/// <reference path="IParte2.ts" />
/// <reference path="IParte3.ts" />
namespace PrimerParcial {
    const URL_API: string = "http://localhost:9876/";
    let xhttp: XMLHttpRequest = new XMLHttpRequest();

    /*window.addEventListener("load", () => {
        if (window.location.href == "http://localhost/autos_node/neumatico_bd.html") {
            Manejadora.MostrarNeumaticosBD();
        }
    });*/

    export class Manejadora implements IParte2, IParte3 {

        private static Limpiar(): void {
            (<HTMLInputElement>document.getElementById("txtMarca_Archivo")).value = "";
            (<HTMLInputElement>document.getElementById("txtPatente_Archivo")).value = "";
            (<HTMLInputElement>document.getElementById("txtColor_Archivo")).value = "";
            (<HTMLInputElement>document.getElementById("txtPrecio_Archivo")).value = "";
        }

        private static LimpiarFoto(): void {
            //(<HTMLInputElement>document.getElementById("foto"));
        }

        public static AgregarAutoJSON() {

            let marca: string = (<HTMLInputElement>document.getElementById("txtMarca_Archivo")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("txtPatente_Archivo")).value;
            let color: string = (<HTMLInputElement>document.getElementById("txtColor_Archivo")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecio_Archivo")).value);
            let auto: Entidades.Auto = new Entidades.Auto(marca, patente, color, precio);
            let autoJSON: any = auto.ToJSON();
            xhttp.open("POST", URL_API + "autos", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(autoJSON));

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    this.MostrarAutosJSON();
                }
            };
        }

        public static MostrarAutosJSON() {

            xhttp.open("GET", URL_API + "autos", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let autos_string_array = JSON.parse(xhttp.responseText);
                    let autos_objeto_array: any[] = [];

                    autos_string_array.forEach((obj_str: string) => {
                        if (obj_str !== "") {
                            autos_objeto_array.push(JSON.parse(obj_str));
                        }
                    });

                    let div = <HTMLDivElement>document.getElementById("divTabla");
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

        public static VerificarAutoJSON() {
            let patente: string = (<HTMLInputElement>document.getElementById("txtPatente_Archivo")).value;

            let dato = {
                "patente":patente,
            };
            xhttp.open("POST", URL_API + "autos/verificar", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(dato));

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                }
            };
        }

        public static ModificarAutoJSON() {
            let marca: string = (<HTMLInputElement>document.getElementById("txtMarca_Archivo")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("txtPatente_Archivo")).value;
            let color: string = (<HTMLInputElement>document.getElementById("txtColor_Archivo")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecio_Archivo")).value);
            let auto: Entidades.Auto = new Entidades.Auto(marca, patente, color, precio);
            let autoJSON: any = auto.ToJSON();
            
            xhttp.open("POST", URL_API + "autos/modificar", true);

            xhttp.setRequestHeader("content-type", "application/json");

            xhttp.send(JSON.stringify(autoJSON));

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    this.MostrarAutosJSON();
                }
            };
        }


        public static AgregarAutoSinFoto() {
            let marca: string = (<HTMLInputElement>document.getElementById("txtMarcaBD")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("txtPatenteBD")).value;
            let color: string = (<HTMLInputElement>document.getElementById("txtColorBD")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecioBD")).value);
            let auto: Entidades.Auto = new Entidades.Auto(marca, patente, color, precio);
            let autoJSON: any = auto.ToJSON();

            xhttp.open("POST", URL_API + "auto_bd_sinFoto", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(autoJSON));

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    this.MostrarAutosBD();
                }
            };
        }
        

        public static MostrarAutosBD() {
            xhttp.open("GET", URL_API + "auto_bd_sinFoto", true);
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
                        let rutaImagen = URL_API  + dato.foto;
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

        public static AsignarManejadoresAutosSinFoto() {

            if (window.location.href == "http://localhost/autos_node/autoBD.html") {
                document.getElementsByName("btnEliminar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { new Manejadora().BorrarAutoFoto(elemento.getAttribute("data-obj")!) });
                });
                document.getElementsByName("btnModificar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { this.ObtenerModificarAutosConFoto(elemento) });
                });
            } else {
                document.getElementsByName("btnEliminar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { new Manejadora().EliminarAuto(elemento.getAttribute("data-obj")!) });
                });
                document.getElementsByName("btnModificar").forEach((elemento) => {
                    elemento.addEventListener("click", () => { this.ObtenerModificarAutoSinFoto(elemento) });
                });
            }
        }

        public static ObtenerModificarAutoSinFoto(dato: any) {

            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            (<HTMLInputElement>document.getElementById("txtIdBD")).value = obj_dato.id;
            (<HTMLInputElement>document.getElementById("txtMarcaBD")).value = obj_dato.marca;
            (<HTMLInputElement>document.getElementById("txtColorBD")).value = obj_dato.color;
            (<HTMLInputElement>document.getElementById("txtPatenteBD")).value = obj_dato.patente;
            (<HTMLInputElement>document.getElementById("txtPrecioBD")).value = obj_dato.precio;
        }

        public static ObtenerModificarAutosConFoto(dato: any) {

            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            (<HTMLInputElement>document.getElementById("txtIdBD")).value = obj_dato.id;
            (<HTMLInputElement>document.getElementById("txtMarcaBD")).value = obj_dato.marca;
            (<HTMLInputElement>document.getElementById("txtColorBD")).value = obj_dato.color;
            (<HTMLInputElement>document.getElementById("txtPatenteBD")).value = obj_dato.patente;
            (<HTMLInputElement>document.getElementById("txtPrecioBD")).value = obj_dato.precio;
            (<HTMLImageElement>document.getElementById("imgFoto")).src = URL_API + "/" + obj_dato.foto;
        }

        /************PARTE 2*******/

        public ModificarAuto() {

            let marca: string = (<HTMLInputElement>document.getElementById("txtMarcaBD")).value;
            let id: string = (<HTMLInputElement>document.getElementById("txtIdBD")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("txtPatenteBD")).value;
            let color: string = (<HTMLInputElement>document.getElementById("txtColorBD")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecioBD")).value);
            let dato = {
                "marca":marca,
                "id":id,
                "patente":patente,
                "color":color,
                "precio":precio
            };
            xhttp.open("POST", URL_API + "auto_bd_sinFoto/modificar", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(dato));
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.MostrarAutosBD();
                }
            };
        }

        public EliminarAuto(dato: any) {
            let autoJSON = JSON.parse(dato);
            let mensaje: string = "Desea eliminar el auto " + autoJSON.marca + " con patente " + autoJSON.patente + "?";
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
                }
            } else {
                alert("Se cancelo la eliminacion del auto");
            }
        }

        /*************PARTE 3************* */

        
        public VerificarAutoBD(): void {
            xhttp.open("POST", URL_API + "auto_bd/verificar", true);
            let neumatico = JSON.stringify({ "marca": (<HTMLInputElement>document.getElementById("txtMarcaBD")).value, "patente": (<HTMLInputElement>document.getElementById("txtPatenteBD")).value });
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
                        (<HTMLDivElement>document.getElementById("divInfo")).innerHTML = tabla;
                        console.log("Auto existe");
                    } else {
                        console.log("No se encontro el auto");
                    }
                }
            }
        }

        public AgregarAutoFoto(): void {
            let marca: string = (<HTMLInputElement>document.getElementById("txtMarcaBD")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("txtPatenteBD")).value;
            let color: string = (<HTMLInputElement>document.getElementById("txtColorBD")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecioBD")).value);
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            //let auto: Entidades.AutoBD = new Entidades.AutoBD(marca,patente,color,precio);
            //let autoJSON = auto.ToJSON();
            let dato = {
                "marca":marca,
                "patente":patente,
                "color":color,
                "precio":precio
            };
            let form: FormData = new FormData();
            form.append('foto', foto.files[0]);
            form.append('obj', JSON.stringify(dato));
            xhttp.open("POST", URL_API + "auto_bd", true);

            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form); //`{"codigo":${codigo}, "marca":${marca}, "precio":${precio}}`

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.MostrarAutosBD();
                }
            };
        }

        public BorrarAutoFoto(dato: any): void {
            let autoJSON = JSON.parse(dato);
            let mensaje: string = "Desea eliminar el auto " + autoJSON.marca + " con patente " + autoJSON.patente + "?";
            let respuesta = window.confirm(mensaje);
            if (respuesta) {  //confirma eliminacion
                xhttp.open("POST", URL_API + "auto_bd/eliminar", true);
                xhttp.setRequestHeader("content-type", "application/json");
                xhttp.send(JSON.stringify(autoJSON));

                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        alert(xhttp.responseText);
                        console.log(xhttp.responseText);
                        Manejadora.MostrarAutosBD();
                    }
                }
            } else {
                alert("Se cancelo la eliminacion del auto");
            }
        }

        public ModificarAutoBDFoto(): void {
            let marca: string = (<HTMLInputElement>document.getElementById("txtMarcaBD")).value;
            let id: string = (<HTMLInputElement>document.getElementById("txtIdBD")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("txtPatenteBD")).value;
            let color: string = (<HTMLInputElement>document.getElementById("txtColorBD")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("txtPrecioBD")).value);
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            //let neumatico: Entidades.NeumaticoBD = new Entidades.NeumaticoBD(marca, medidas, precio, id);
            //let neumatico_json: any = neumatico.ToJSON();
            let dato = {
                "marca":marca,
                "patente":patente,
                "color":color,
                "precio":precio,
                "id":id
            };
            let form: FormData = new FormData();
            form.append('foto', foto.files[0]);
            form.append('obj', JSON.stringify(dato));
            let xhttp: XMLHttpRequest = new XMLHttpRequest();

            xhttp.open("POST", URL_API + "auto_bd/modificar", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    Manejadora.MostrarAutosBD();
                }
            };
        }
    }
}