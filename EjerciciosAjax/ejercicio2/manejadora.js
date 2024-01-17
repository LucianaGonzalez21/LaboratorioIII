"use strict";
var App2;
(function (App2) {
    const xhttp = new XMLHttpRequest();
    const formData = new FormData();
    function Administrar() {
        let pathArchivo = document.getElementById("txtPath").value;
        xhttp.open("POST", "mostrarArchivo.php", true);
        formData.append("path", pathArchivo);
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
    App2.Administrar = Administrar;
})(App2 || (App2 = {}));
//# sourceMappingURL=manejadora.js.map