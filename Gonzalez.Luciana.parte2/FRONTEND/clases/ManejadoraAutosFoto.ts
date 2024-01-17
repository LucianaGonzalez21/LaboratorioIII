/// <reference path="Auto.ts" />
/// <reference path="AutoFoto.ts" />

namespace RecPrimerParcial {
    const URL_API: string = "http://localhost:2023/";
    let xhttp: XMLHttpRequest = new XMLHttpRequest();

    window.addEventListener("load", () => {
        if(window.location.href == "http://localhost/Gonzalez.Luciana.parte2/auto_foto_bd.html"){
            ManejadoraAutoFotos.MostrarAutoFotosBD();
        }
        });

    export class ManejadoraAutoFotos {
        
        public static AsignarManejadoresAutosConFoto() {
            document.getElementsByName("btnEliminar").forEach((elemento) => {
                elemento.addEventListener("click", () => { new ManejadoraAutoFotos().EliminarAutoFotoBD(elemento) });
            });
            document.getElementsByName("btnModificar").forEach((elemento) => {
                elemento.addEventListener("click", () => { this.ObtenerModificarAutosConFoto(elemento) });
            });

        }

        public static ObtenerModificarAutosConFoto(dato: any) {

            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            (<HTMLInputElement>document.getElementById("marca")).value = obj_dato.marca;
            (<HTMLInputElement>document.getElementById("color")).value = obj_dato.color;
            (<HTMLInputElement>document.getElementById("patente")).value = obj_dato.patente;
            (<HTMLInputElement>document.getElementById("precio")).value = obj_dato.precio;
            (<HTMLImageElement>document.getElementById("imgFoto")).src = URL_API + obj_dato.foto;
        }

        public static AgregarAutoFotoBD(): void {
            let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("patente")).value;
            let color: string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio: string = (<HTMLInputElement>document.getElementById("precio")).value;
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));

            let form: FormData = new FormData();
            form.append('foto', foto.files[0]);
            form.append('marca', marca);
            form.append('patente', patente);
            form.append('color',color);
            form.append('precio', precio);

            xhttp.open("POST", URL_API + "agregarAutoFotoBD", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form); 

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    ManejadoraAutoFotos.MostrarAutoFotosBD();
                }
            };
        }

        public static MostrarAutoFotosBD() {
            xhttp.open("GET", URL_API + "listarAutoFotosBD", true);
            xhttp.send();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let neumaticos_objeto_array: any[] = JSON.parse(xhttp.responseText);
                    let div = <HTMLDivElement>document.getElementById("divTablaAutoFotos");
                    let tabla = `<table>
                                    <tr>
                                        <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th><th>FOTO</th><th>ACCION</th>
                                    </tr>`;
                    for (let index = 0; index < neumaticos_objeto_array.length; index++) {
                        const dato = neumaticos_objeto_array[index];
                        let foto ="";
                        if(dato.foto != null){
                            foto = '<img src=' +URL_API +dato.foto + ' width="50px" hight="50px">';
                        }
                        tabla += `<tr><tr><td>${dato.patente}</td><td>${dato.marca}</td><td>${dato.precio}</td><td><input type="color" disabled value="${dato.color}"></td>
                                    <td>${foto}</td>
                                    <td><input type="button" id="" data-obj='${JSON.stringify(dato)}'
                                        value="Eliminar" name="btnEliminar"></td>
                                    <td><input type="button" id="" data-obj='${JSON.stringify(dato)}' 
                                        value="Modificar" name="btnModificar"></td></tr>`;
                    }
                    tabla += `</table>`;
                    div.innerHTML = tabla;
                    ManejadoraAutoFotos.AsignarManejadoresAutosConFoto();
                }
            };
        }

        public EliminarAutoFotoBD(dato: any): void {
            let obj = dato.getAttribute("data-obj");
            let obj_dato = JSON.parse(obj);
            let data = {
                "patente": obj_dato.patente,
            };
            let xhttp : XMLHttpRequest = new XMLHttpRequest();
            xhttp.open("POST", URL_API + "eliminarAutoFotoBD", true);
            xhttp.setRequestHeader("content-type","application/json");
            let confirmacion =  confirm("Estas seguro que quieres borrar el auto " + obj_dato.marca + 
            " con patente " + obj_dato.patente + "?");
            if(confirmacion == false){
                alert("Se canceló la eliminación");
            } else{
                xhttp.send(JSON.stringify(data));
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let mensaje : string = xhttp.responseText;
                        alert(mensaje);
                        ManejadoraAutoFotos.MostrarAutoFotosBD();
                    }
                };
            }
        }

        public static ModificarAutoFotoBD(): void {
            let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
            let patente: string = (<HTMLInputElement>document.getElementById("patente")).value;
            let color: string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio: number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            //let neumatico: Entidades.NeumaticoBD = new Entidades.NeumaticoBD(marca, medidas, precio, id);
            //let neumatico_json: any = neumatico.ToJSON();
            let dato = {
                "marca": marca,
                "patente": patente,
                "color": color,
                "precio": precio,
            };
            let form: FormData = new FormData();
            form.append('foto', foto.files[0]);
            form.append('autoFoto_json', JSON.stringify(dato));
            let xhttp: XMLHttpRequest = new XMLHttpRequest();

            xhttp.open("POST", URL_API + "modificarAutoFotoBD", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(form);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let mensaje: string = xhttp.responseText;
                    alert(mensaje);
                    ManejadoraAutoFotos.MostrarAutoFotosBD();
                }
            };
        }
    }
}