"use strict";
var App6;
(function (App6) {
    const xhttp = new XMLHttpRequest();
    function Administrar() {
        let nombre = document.getElementById("txtNombre").value;
        xhttp.open("GET", "verificarDisponibilidad.php?nombre=" + nombre, true);
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("spnExiste").innerHTML = xhttp.responseText;
            }
        };
    }
    App6.Administrar = Administrar;
})(App6 || (App6 = {}));
//# sourceMappingURL=manejadora.js.map