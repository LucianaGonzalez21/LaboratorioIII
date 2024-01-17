"use strict";
var Ejercicio;
(function (Ejercicio) {
    function MostrarResultado() {
        let numero = (Number)(document.getElementById("nmbNumero").value);
        let xhttp = new XMLHttpRequest();
        let formData = new FormData();
        //alert(numero);
        xhttp.open("POST", "calculos.php", true);
        formData.append("numero", numero.toString());
        xhttp.send(formData);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                //alert(xhttp.responseText);
                document.getElementById("txtResultado").value = xhttp.responseText;
            }
        };
    }
    Ejercicio.MostrarResultado = MostrarResultado;
})(Ejercicio || (Ejercicio = {}));
//# sourceMappingURL=manejadora.js.map