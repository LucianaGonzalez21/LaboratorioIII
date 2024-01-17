"use strict";
var App5;
(function (App5) {
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
    App5.Administrar = Administrar;
})(App5 || (App5 = {}));
//# sourceMappingURL=manejadora.js.map