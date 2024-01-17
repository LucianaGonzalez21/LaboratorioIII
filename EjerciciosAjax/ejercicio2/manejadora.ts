
namespace App2 {
    const xhttp: XMLHttpRequest = new XMLHttpRequest();
    const formData: FormData = new FormData();

    export function Administrar() {
        let pathArchivo: string = (<HTMLInputElement>document.getElementById("txtPath")).value;

        xhttp.open("POST", "mostrarArchivo.php", true);
        formData.append("path", pathArchivo);
        xhttp.send(formData);

        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                (<HTMLDivElement>document.getElementById("divContenido")).innerHTML = xhttp.responseText;
                if (xhttp.responseText == "") {
                    alert("Error. No existe el path ingresado");
                }
            }
        }
    }
}