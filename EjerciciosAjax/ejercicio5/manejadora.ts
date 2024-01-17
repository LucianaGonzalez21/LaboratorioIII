namespace App5{
    const xhttp : XMLHttpRequest = new XMLHttpRequest();
    export function Administrar(){
        let nombre : string = (<HTMLInputElement>document.getElementById("txtNombre")).value;
        xhttp.open("GET", "verificarDisponibilidad.php?nombre=" + nombre, true);
        xhttp.send();

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200){
                (<HTMLSpanElement>document.getElementById("spnExiste")).innerHTML = xhttp.responseText;
            }
        }
    }
}