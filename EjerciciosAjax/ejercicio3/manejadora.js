"use strict";
var App3;
(function (App3) {
    const xhttp = new XMLHttpRequest();
    const formData = new FormData();
    function Administrar() {
        let pathArchivo = document.getElementById("txtPath").value;
        let palabra = document.getElementById("txtPalabra").value;
        xhttp.open("POST", "mostrarArchivo.php", true);
        formData.append("path", pathArchivo);
        formData.append("palabra", palabra);
        xhttp.send(formData);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("divContenido").innerHTML = xhttp.responseText;
                if (xhttp.responseText == "") {
                    alert("Error. No existe el path ingresado");
                }
            }
        };
    }
    App3.Administrar = Administrar;
})(App3 || (App3 = {}));
//# sourceMappingURL=manejadora.js.map