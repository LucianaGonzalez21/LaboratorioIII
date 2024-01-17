
namespace Ejercicio
{
    
    export function MostrarResultado(){
        let numero : number = (Number)((<HTMLInputElement>document.getElementById("nmbNumero")).value); 
        let xhttp : XMLHttpRequest = new XMLHttpRequest();
        let formData : FormData = new FormData();

        //alert(numero);
         xhttp.open("POST", "calculos.php", true);
         formData.append("numero", numero.toString());

         xhttp.send(formData);

         xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200){
                //alert(xhttp.responseText);
                (<HTMLInputElement>document.getElementById("txtResultado")).value = xhttp.responseText;
            }
         }
    }
}