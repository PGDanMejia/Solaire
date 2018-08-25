$("#boton-modificar").click(function(){
    
    var parametros = "nombre="+$("#nombre-modificar").val() + "&" + 
                     "apellido="+$("#apellido-modificar").val()  + "&" + 
                     "correo="+$("#correo-modificar").val() + "&" + 
                     "contrasena="+$("#contrasena-modificar").val();
    
	$.ajax({
		url:"/actualizar-perfil",
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






$(document).ready(function(){
	$.ajax({
        url:"/sesion",
        data:"",
        method:"GET",
        dataType:"json",
        success:function(respuesta){
            $("#nombre-usuario-boton").html(respuesta.nombre + " " + respuesta.apellido);
            $("#nombre-modificar").val(respuesta.nombre);
            $("#apellido-modificar").val(respuesta.apellido);
            $("#correo-modificar").val(respuesta.correo);
            
          
            console.log(respuesta);
            console.log(respuesta.nombre);
            console.log(respuesta.codigo_plan);
        }   
    });

    

});
