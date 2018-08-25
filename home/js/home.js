function obtenerPapelera(){
	$.ajax({
		url:"/obtener-papelera",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			$("#div-archivos").html("");
			$("#div-archivos").append(
				`<div style="background-color: #FCA745; width:100%" class="content col-xl-12 col-lg-12 col-md-12 col-xs-12 col-12">
				<label class="direccion"><i class="fas fa-trash"></i> Papelera </label>
			</div>`
			);
			for(var i=0; i<respuesta.length; i++){
				console.log(respuesta);
				$("#div-archivos").append(
					`<div  class="archivos content col-xl-2 col-lg-2 col-md-4 col-xs-6 col-6" onClick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
					<img src="img/Programacion/${respuesta[i].extension_archivo}.png" alt="">
					<p class="archivos-texto">${respuesta[i].nombre_archivo}.${respuesta[i].extension_archivo}</p>
				  </div>`
				);
			}
		}
	});
}


function obtenerFavoritos(){
	$.ajax({
		url:"/obtener-favoritos",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			$("#div-archivos").html("");
			$("#div-archivos").append(
				`<div style="background-color: #FCA745; width:100%" class="content col-xl-12 col-lg-12 col-md-12 col-xs-12 col-12">
				<label class="direccion"><i class="fas fa-star"></i> Favoritos </label>
			</div>`
			);
			for(var i=0; i<respuesta.length; i++){
				console.log(respuesta);
				$("#div-archivos").append(
					`<div  class="archivos content col-xl-2 col-lg-2 col-md-4 col-xs-6 col-6" onClick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
					<img src="img/Programacion/${respuesta[i].extension_archivo}.png" alt="">
					<p class="archivos-texto">${respuesta[i].nombre_archivo}.${respuesta[i].extension_archivo}</p>
				  </div>`
				);
			}
		}
	});
}

function obtenerCompartidos(){
	$.ajax({
		url:"/obtener-compartidos",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			$("#div-archivos").html("");
			$("#div-archivos").append(
				`<div style="background-color: #FCA745; width:100%" class="content col-xl-12 col-lg-12 col-md-12 col-xs-12 col-12">
				<label class="direccion"><i class="fas fa-share-alt-square"></i> Compartidos conmigo </label>
			</div>`
			);
			for(var i=0; i<respuesta.length; i++){
				console.log(respuesta);
				$("#div-archivos").append(
					`<div  class="archivos content col-xl-2 col-lg-2 col-md-4 col-xs-6 col-6" onClick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
					<img src="img/Programacion/${respuesta[i].extension_archivo}.png" alt="">
					<p class="archivos-texto">${respuesta[i].nombre_archivo}.${respuesta[i].extension_archivo}</p>
				  </div>`
				);
			}
		}
	});
}



function cambiarCarpeta(codigoCarpeta){
	$.ajax({
		url:"/cambiar-codigo-carpeta",
		method:"POST",
		data:"codigo_carpeta="+codigoCarpeta,
		dataType:"json",
		success:function(respuesta){
			cargarCarpetas();
			console.log(respuesta);
		}
	})
}


function seleccionarArchivo(codigoArchivo){
	$.ajax({
		url:"/guardar-codigo-archivo",
		method:"POST",
		data:"codigo_archivo="+codigoArchivo,
		dataType:"json",
		success:function(respuesta){
			window.location.href = "editar.html";
			console.log(respuesta);
		}
	})
}

function nuevoElemento(codigoElemento){
	if(codigoElemento == 1){
		$('#nuevo-archivo-div').modal();
	}else if(codigoElemento == 2){
		$('#nueva-carpeta-div').modal();
	}else if(codigoElemento == 3){
		$('#nuevo-contacto-div').modal();
	}
}

function verificarSesion(){
	parametros = "";
	$.ajax({
		url:"/ruta-restringida",
		method:"GET",
		data: parametros,
		dataType:"json",
		
		success:function(respuesta){
			if(respuesta.msj == "restringida"){
				window.location.href = "index.html";
				console.log(respuesta);
			}
			console.log(respuesta);
		}
	});

}

function cargarArchivos(){
	$.ajax({
		url:"/obtener-archivos",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			//$("#div-archivos").html("");
			/*$("#div-archivos").append(
				`<div style="background-color: #FCA745; width:100%" class="content col-xl-12 col-lg-12 col-md-12 col-xs-12 col-12">
				<label class="direccion"><i class="fas fa-folder"></i>  Mis archivos / <i class="fas fa-folder"></i>  Archivos de prueba</label>
			</div>`
			);*/
			for(var i=0; i<respuesta.length; i++){
				console.log(respuesta);
				$("#div-archivos").append(
					`<div  class="archivos content col-xl-2 col-lg-2 col-md-4 col-xs-6 col-6" onClick="seleccionarArchivo(${respuesta[i].codigo_archivo});">
					<img src="img/Programacion/${respuesta[i].extension_archivo}.png" alt="">
					<p class="archivos-texto">${respuesta[i].nombre_archivo}.${respuesta[i].extension_archivo}</p>
				  </div>`
				);
			}
		}
	});
}

function cargarCarpetas(){
	$.ajax({
		url:"/obtener-carpetas",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			$("#div-archivos").html("");
			$("#div-archivos").append(
				`<div style="background-color: #FCA745; width:100%" class="content col-xl-12 col-lg-12 col-md-12 col-xs-12 col-12" onClick="cambiarCarpeta(0);">
				<label id="mis-archivos-hover" class="direccion"><i class="fas fa-folder"></i>  Mis archivos</label>
			</div>`
			);
			for(var i=0; i<respuesta.length; i++){
				console.log(respuesta);
				$("#div-archivos").append(
					`<div class="archivos content col-xl-2 col-lg-2 col-md-4 col-xs-6 col-6"  onClick="cambiarCarpeta(${respuesta[i].codigo_carpeta});">
					<img src="img/Programacion/folder.png" alt="">
					<p class="archivos-texto">${respuesta[i].nombre_carpeta}</p>
				  </div>`
				);
			}
			cargarArchivos();
		}
	});
}


$("#agregar-archivo").click(function(){
	var parametros = "nombre_archivo="+$("#nombre-archivo").val() + "&" + 
					 "tipo_archivo="+$("#tipo-archivo").val();
	$.ajax({
		url:"/nuevo-archivo",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				//cargarArchivos();
				cargarCarpetas();
			}
			console.log(respuesta);
			$('#nuevo-archivo-div').modal('hide');
		}
	});
});

$("#agregar-carpeta").click(function(){
	var parametros = "nombre_carpeta="+$("#nombre-carpeta").val();
	$.ajax({
		url:"/nueva-carpeta",
		method:"POST",
		data:parametros,
		dataType:"json",
		success:function(respuesta){
			if (respuesta.affectedRows==1){
				//cargarArchivos();
				cargarCarpetas();
			}
			console.log(respuesta);
			$('#nueva-carpeta-div').modal('hide');
		}
	});
});



$("#agregar-contacto").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
		
        $.ajax({
            url:"/agregar-contacto",
            method:"POST",
            data:"codigo_contacto="+$("#select-contactos").val(),
            dataType:"json",
            success:function(response){
                if(response.estatus == 1){
                    $('#contacto-existente').modal();
                }else{
					$('#contacto-agregado').modal();
					
                }
                console.log(response);
            }
        });

    
	
});






$(document).ready(function(){
	cargarCarpetas();
	verificarSesion();
	$.ajax({
        url:"/sesion",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
			$("#nombre-usuario-boton").html(respuesta.nombre + " " + respuesta.apellido);
			console.log(respuesta);
        }
    });

	$.ajax({
		url:"/obtener-todos-usuarios",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){
				$("#select-contactos").append('<option value="'+respuesta[i].codigo_usuario+'">'+respuesta[i].nombre + " " + respuesta[i].apellido +'</option>');
	
			}
		}
	});

	
});
