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



$(document).ready(function(){
	
	$.ajax({
		url:"/codigo-fuente",
		dataType:"json",
		success:function(respuesta){
                //$("codigo-archivo-hidden").val(respuesta.codigoArchivo);   
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
	
});