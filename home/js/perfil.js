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

    $.ajax({
		url:"/historial-facturas",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){
                if(respuesta[i].codigo_plan == 1){
                    plan = "Básico"
                }else if(respuesta[i].codigo_plan == 2){
                    plan = "Avanzado"
                }else if(respuesta[i].codigo_plan == 3){
                    plan = "Premium"
                }
				$("#cuerpo-tabla").append(`<tr>
                <th scope="row">${respuesta[i].codigo_factura}</th>
                <td>${plan}</td>
                <td>${respuesta[i].fecha_inicio}</td>
                <td>${respuesta[i].monto}</td>
              </tr>`);
	
			}
		}
	});
	
});
