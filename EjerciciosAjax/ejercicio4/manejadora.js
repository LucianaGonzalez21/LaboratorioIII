"use strict";
var App4;
(function (App4) {
    const xhttp = new XMLHttpRequest();
    //const formData : FormData = new FormData();
    function Administrar() {
        let numUno = (Number)(document.getElementById("txtNumUno").value);
        let numDos = (Number)(document.getElementById("txtNumDos").value);
        let operador = document.getElementById("selOperador").value;
        xhttp.open("GET", "calculadora.php?numUno=" + numUno + "&numDos=" + numDos + "&operador=" + operador, true);
        //formData.append("numUno", numUno.toString());
        //formData.append("numDos", numDos.toString());
        xhttp.send();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("spnResultado").innerHTML = xhttp.responseText;
            }
        };
    }
    App4.Administrar = Administrar;
})(App4 || (App4 = {}));
//# sourceMappingURL=manejadora.js.map