function contratarPlan(codigoPlan){
    var parametros = "codigo_plan="+codigoPlan;
    if (codigoPlan == 1){
        valor = 5;
    }else if (codigoPlan == 2){
        valor = 10;
    }else if (codigoPlan == 3){
        valor = 15;
    }



	$.ajax({
		url:"/actualizar-plan-usuario",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
                console.log(respuesta);
               
			}
			console.log(respuesta);
			
		}
    });
    
    $.ajax({
		url:"/registrar-factura",
		method:"POST",
		data:"codigo_plan="+codigoPlan + "&" + "monto=" +valor,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
                console.log(respuesta);
                $('#pago-realizado').modal();
			}
			console.log(respuesta);
			
		}
	});
}



$(document).ready(function(){
	$.ajax({
        url:"/sesion",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
            $("#nombre-usuario-boton").html(respuesta.nombre + " " + respuesta.apellido);
            console.log(respuesta);
            console.log(respuesta.nombre);
            console.log(respuesta.codigo_plan);
        }   
    });
	
});
