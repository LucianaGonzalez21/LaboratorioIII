namespace App4{

    const xhttp : XMLHttpRequest = new XMLHttpRequest();
    //const formData : FormData = new FormData();

    export function Administrar(){
        let numUno : number = (Number)((<HTMLInputElement>document.getElementById("txtNumUno")).value);
        let numDos : number = (Number)((<HTMLInputElement>document.getElementById("txtNumDos")).value);
        let operador : string = (<HTMLInputElement>document.getElementById("selOperador")).value;

        xhttp.open("GET", "calculadora.php?numUno=" + numUno + "&numDos=" + numDos + "&operador=" + operador, true);
        //formData.append("numUno", numUno.toString());
        //formData.append("numDos", numDos.toString());
        xhttp.send()

        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200){
                (<HTMLSpanElement>document.getElementById("spnResultado")).innerHTML = xhttp.responseText;
            }
        }
    }
}