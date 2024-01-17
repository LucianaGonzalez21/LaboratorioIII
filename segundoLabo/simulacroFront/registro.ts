/// <reference path="./node_modules/@types/jquery/index.d.ts" />

/*
function Registro() 
{
    let xhr : XMLHttpRequest = new XMLHttpRequest();

    let correo : string = (<HTMLInputElement> document.getElementById("regcorreo")).value;
    let clave : string = (<HTMLInputElement> document.getElementById("regpassword")).value;
    let nombre : string = (<HTMLInputElement> document.getElementById("regnombre")).value;
    let apellido : string = (<HTMLInputElement> document.getElementById("regapellido")).value;
    let perfil : string = (<HTMLInputElement> document.getElementById("regperfil")).value;
    let fotoInput :any = <HTMLInputElement> document.getElementById("regfoto");


    //let path = document.getElementById("regfoto").value;
    //let pathFoto = (path.split('\\'))[2];
    let form = new FormData();
    
    //let json = "{'correo':'" + regcorreo + "','clave':'" + regpassword + "','nombre':'" + regnombre + "','apellido':'" + regapellido + "','perfil':'" + regperfil + "'}";
    
    let obj: Object = {
        "correo": correo,
        "clave": clave,
        "nombre": nombre,
        "apellido": apellido,
        "perfil": perfil,
    };

    form.append('usuario', JSON.stringify(obj));
    form.append('foto', fotoInput.files[0]);
    xhr.open('POST', , true);
    xhr.setRequestHeader("enctype", "multipart/form-data");
    xhr.send(form);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);

            let respuesta = JSON.parse(xhr.responseText);

            if(respuesta.exito == true)
            {
                window.location.replace("./login.html");
            }

            //(<HTMLInputElement> document.getElementById("errorReg")).type = "";
            //(<HTMLInputElement> document.getElementById("errorReg")).style.display = "block";
            //$('#errorReg').removeClass("hide");
            //$('#errorReg').addClass("alert alert-danger show");
            //$('#errorReg').alert();
            //Segun la respuesta , registro correcto o no poner una ventana que avise lo acontecido    
            //$('#myModal').modal("hide");
            //window.location.replace("./login.php");
        }
        else if (xhr.readyState == 4 && xhr.status != 200) {
            $('#errorReg').removeClass("hide");

            let respuesta = xhr.responseText;
            let objRespuesta = JSON.parse(respuesta);

            let aux;
            aux=document.getElementById("errorReg");
            if(aux!=null)
                aux.innerHTML = objRespuesta.Mensaje;
        }
    };
}*/


$(()=>{

    $("#btnEnviarRegistro").on("click", (e:any)=>{

        e.preventDefault();

        let correo = $("#regcorreo").val();
        let regpassword = $("#regpassword").val();
        let nombre = $("#nombre").val();
        let apellido = $("#apellido").val();
        let perfil = $("#perfil").val();

        let dato:any = {};
        dato.correo = correo;
        dato.clave = regpassword;
        dato.apellido = apellido;
        dato.nombre = nombre;
        dato.perfil = perfil;

        $.ajax({
            type: 'POST',
            url: URL_API + "registro",
            dataType: "json",
            data: dato,
            async: true
        })
        .done(function (obj_ret:any) {

            console.log(obj_ret);
            let alerta:string = "";

            if(obj_ret.exito){
                //GUARDO EN EL LOCALSTORAGE
                localStorage.setItem("jwt", obj_ret.jwt);                

                alerta = ArmarAlert(obj_ret.mensaje + " redirigiendo al principal.php...");
    
                setTimeout(() => {
                    $(location).attr('href', URL_BASE + "index.html");
                }, 2000);

            }

            $("#div_mensaje").html(alerta);
            
        })
        .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

            let retorno = JSON.parse(jqXHR.responseText);

            let alerta:string = ArmarAlert(retorno.mensaje, "danger");

            $("#div_mensaje").html(alerta);

        });    

    });

});

