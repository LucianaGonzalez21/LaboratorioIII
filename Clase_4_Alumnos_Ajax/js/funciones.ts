namespace Ajax {

    //creo una instancia de xmlhttprequest
    let xhttp = new XMLHttpRequest();

    export function Listar(): void {
        //metodo; url; asincrono
        xhttp.open("GET", "./BACKEND/nexo_poo.php?accion=listar", true);

        //envio de la peticion
        xhttp.send();

        //funcion callback
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                
            }
        }
    }

}