$("#boton-registrarse").click(function(){
	//alert("Enviar mensaje: " + $("#txta-mensaje").val());
    if( $("#nombre-registro").val() != '' && $("#apellido-registro").val() != '' && $("#correo-registro").val() != '' &&  $("#contrasena-registro").val() != ''){
        var parametros = "nombre="+$("#nombre-registro").val() + "&" + 
					 "apellido="+$("#apellido-registro").val() + "&"+
                     "correo="+$("#correo-registro").val()+ "&"+
                     "contrasena="+$("#contrasena-registro").val();
        $.ajax({
            url:"/registrar-usuario",
            method:"POST",
            data:parametros,
            dataType:"json",
            success:function(response){
                if(response.estatus == 1){
                    $('#cuenta-existente').modal();
                }else{
                    window.location.href ="home.html";
                }
                console.log(response);
            }
        });
    }else{
        console.log("campos vacios");
        $('#campos-vacios').modal();
    }
    
	
});

$("#boton-inicio-sesion").click(function(){
    if( $("#correo-login").val() != '' && $("#contrasena-login").val()){
        $.ajax({
            url:"/login",
            data:"correo="+$("#correo-login").val()+"&contrasena="+$("#contrasena-login").val(),
            method:"POST",
            dataType:"json",
            success:function(respuesta){
                if (respuesta.estatus == 0 )   
                    window.location.href ="home.html";
                    //console.log(respuesta);
                else
                    //alert("Credenciales incorrectas");
                    $('#datos-invalidos').modal();
            }
        });
    }else{
        console.log("campos vacios");
        $('#campos-vacios').modal();
    }
    
});
