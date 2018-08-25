$("#boton-guardar").click(function(){
    var editor = ace.edit("editor");
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    var parametros = "contenido="+editor.getValue();
    
	$.ajax({
		url:"/guardar-archivo",
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
});

$("#actualizar-nombre").click(function(){
    var parametros = "nombre="+$("#nombre-archivo-nuevo").val();
    
	$.ajax({
		url:"/actualizar-nombre-archivo",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				$('#modificar-nombre-div').modal('hide');
				nombre();
			}
			console.log(respuesta);
			
		}
	});
});



$("#boton-mover-archivo").click(function(){
    var parametros = "codigo_carpeta="+$("#select-carpetas").val();
    
	$.ajax({
		url:"/mover-archivos",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				$('#mover-archivo').modal('hide');
				nombre();
			}
			console.log(respuesta);
			
		}
	});
});



$("#boton-compartir-archivo").click(function(){
    var parametros = "codigo_contacto="+$("#select-contactos").val();
    console.log($("#select-contactos").val());
	$.ajax({
		url:"/compartir-archivo",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				$('#compartir-archivo').modal('hide');
			}else{
				$('#ya-compartido').modal();
			}
			console.log(respuesta);
			
		}
	});
});



function nombre(){
	$.ajax({
		url:"/codigo-fuente",
		dataType:"json",
		success:function(respuesta){
				//$("codigo-archivo-hidden").val(respuesta.codigoArchivo); 
			
				$('#nombre_archivo').html(respuesta[0].nombre_archivo + "."+ respuesta[0].extension_archivo);
                console.log(respuesta);
                console.log(respuesta[0].contenido_archivo);
            
        }
	});

}

function nuevaAccion(codigoAccion){
	if(codigoAccion == 1){
		$('#modificar-nombre-div').modal();
	}else if(codigoAccion == 2){
		$.ajax({
			url:"/anadir-favorito",
			method:"POST",
			data:"",
			dataType:"json",
			success:function(respuesta){
				if (respuesta.affectedRows==1){
					$('#ya-favorito').modal();
				}
				console.log(respuesta);
				
			}
		});
	}else if(codigoAccion == 3){
		$('#compartir-archivo').modal();
	}else if(codigoAccion == 4){
		$('#mover-archivo').modal();
	}else if(codigoAccion == 5){
		$.ajax({
			url:"/eliminar-archivo",
			method:"POST",
			data:"",
			dataType:"json",
			success:function(respuesta){
				if (respuesta.affectedRows==1){
					$('#ya-eliminado').modal();
					window.location.href = "home.html";
				}
				console.log(respuesta);
				
			}
		});
	}
}



$(document).ready(function(){
	
	$.ajax({
		url:"/codigo-fuente",
		dataType:"json",
		success:function(respuesta){
				//$("codigo-archivo-hidden").val(respuesta.codigoArchivo); 
			
				$('#nombre_archivo').html(respuesta[0].nombre_archivo + "."+ respuesta[0].extension_archivo);
                console.log(respuesta);
                console.log(respuesta[0].contenido_archivo);
                var editor = ace.edit("editor");
                var modo = "ace/mode/" + respuesta[0].extension_archivo
                console.log(modo);
                editor.setTheme("ace/theme/monokai");
                editor.session.setMode(modo);
                editor.setValue(respuesta[0].contenido_archivo);
                console.log(editor.getValue());
              // <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.8/ace.js" type="text/javascript" charset="utf-8"></script>
             
        }
	});

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
	
	$.ajax({
        url:"/obtener-contactos",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
			for(var i=0; i<respuesta.length; i++){
				$("#select-contactos").append('<option value="'+respuesta[i].codigo_usuario_amigo+'">'+respuesta[i].nombre + " " + respuesta[i].apellido +'</option>');
				console.log(respuesta);
				console.log(respuesta.nombre);
				console.log(respuesta.codigo_plan);
			}
        }   
    });
	

	$.ajax({
        url:"/obtener-carpetas",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
			for(var i=0; i<respuesta.length; i++){
				$("#select-carpetas").append('<option value="'+respuesta[i].codigo_carpeta+'">'+respuesta[i].nombre_carpeta+'</option>');
				console.log(respuesta);
				console.log(respuesta.nombre);
				console.log(respuesta.codigo_plan);
			}
        }   
    });

});