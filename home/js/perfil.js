$(document).ready(function(){
	$.ajax({
        url:"/sesion",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
            $("#nombre-usuario-boton").html(respuesta.nombre + " " + respuesta.apellido);
            $("#nombre-perfil").text(respuesta.nombre + " ");
            $("#apellido-perfil").text(respuesta.apellido + " ");
            $("#correo-perfil").text(respuesta.correo + " ");
            if(respuesta.codigo_plan == 1){
                $("#tipo-perfil").text("Plan básico");
            }else if(respuesta.codigo_plan == 1){
                $("#tipo-perfil").text("Plan avanzado");
            }else{
                $("#tipo-perfil").text("Plan premium");
            }
            console.log(respuesta);
            console.log(respuesta.nombre);
            console.log(respuesta.codigo_plan);
        }   
    });

    $.ajax({
        url:"/obtener-archivos-totales",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
            $("#archivos-perfil").html(respuesta.length);
           
            console.log(respuesta);
            console.log(respuesta.nombre);
            console.log(respuesta.codigo_plan);
        }   
    });
	
});
