var express  = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var cookieParser = require("cookie-parser");

var app = express();


var credenciales = {
    user:"root",
    password:"",
    port:"3306",
    host:"localhost",
    database:"solaire"
};


//Exponer una carpeta como publica, unicamente para archivos estaticos: .html, imagenes, .css, .js
app.use(express.static("public")); //Middlewares
app.use(bodyParser.json());
app.use(cookieParser());//Middleware para parsera las cookies en el JSON request.cookies
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"AsjFJ%!FJa",resave:true, saveUninitialized:true}));

var publicHome = express.static("home");
app.use(
    function(peticion,respuesta,next){
        if (peticion.session.correo){
            //Significa que el usuario si esta logueado
            if (peticion.session.correo){
                publicHome(peticion,respuesta,next);
            }
                
        }
        else
            return next();
    }
);





app.post("/registrar-usuario", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql_insertar = 'INSERT INTO tbl_usuarios(nombre, apellido, correo, contrasena, codigo_plan) VALUES (?,?,?,?,1)';
    var sql_consultar = 'SELECT * FROM tbl_usuarios where correo = ?';
    
    conexion.query(sql_consultar,[request.body.correo],function (err, data, fields) { 
        if(data.length>0){
            response.send({estatus:1, mensaje:"Ya hay una cuenta con este correo."});
        }else{
            conexion.query(
                sql_insertar,
                [request.body.nombre, request.body.apellido, request.body.correo, request.body.contrasena],
                function(err, result){
                    if (err) throw err;
                    request.session.correo = request.body.correo;
                    response.send(result);
                    
                }
            );
        }
     });
    
     
});

app.post("/login", function(peticion, respuesta){
    var conexion = mysql.createConnection(credenciales);
    conexion.query("SELECT * FROM tbl_usuarios WHERE correo=? and contrasena=?",
        [peticion.body.correo, peticion.body.contrasena],
        function(err, data, fields){
                if (data.length>0){
                    peticion.session.correo = data[0].correo;
                    peticion.session.codigoUsuario = data[0].codigo_usuario;
                    peticion.session.nombre = data[0].nombre;
                    peticion.session.apellido = data[0].apellido;
                    peticion.session.codigo_plan = data[0].codigo_plan;
                    data[0].estatus = 0;
                    respuesta.cookie("carpeta", 0)
                    respuesta.send(data[0]); 
                    ;
                }else{
                    respuesta.send({estatus:1, mensaje: "Login fallido"}); 
                }
            	
         }
    ); 
});


app.post("/guardar-archivo", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'UPDATE tbl_archivos SET contenido_archivo = ? WHERE codigo_archivo = ?';
    
    conexion.query(
        sql,
        [request.body.contenido, request.cookies.codigo],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    ); 
});

app.post("/actualizar-perfil", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'UPDATE tbl_usuarios SET nombre = ?, apellido = ?, correo = ?, contrasena = ? WHERE codigo_usuario = ?';
    
    conexion.query(
        sql,
        [request.body.nombre, request.body.apellido, request.body.correo, request.body.contrasena, request.session.codigoUsuario],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    ); 
});



app.get("/obtener-archivos", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_archivos WHERE codigo_usuario = ? AND codigo_carpeta = ?`;
    var usuarios = [];
    conexion.query(sql, [request.session.codigoUsuario, request.cookies.carpeta])
    .on("result", function(resultado){
        usuarios.push(resultado);
    })
    .on("end",function(){
        response.send(usuarios);
    });   
});

app.get("/obtener-archivos-totales", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_archivos WHERE codigo_usuario = ?`;
    var usuarios = [];
    conexion.query(sql, [request.session.codigoUsuario])
    .on("result", function(resultado){
        usuarios.push(resultado);
    })
    .on("end",function(){
        response.send(usuarios);
    });   
});

app.get("/obtener-carpetas", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_carpetas WHERE codigo_usuario = ? AND codigo_carpeta_padre = ?`;
    var usuarios = [];
    conexion.query(sql, [request.session.codigoUsuario, request.cookies.carpeta])
    .on("result", function(resultado){
        usuarios.push(resultado);
    })
    .on("end",function(){
        response.send(usuarios);
    });   
});



app.get("/logout",function(peticion, respuesta){
    peticion.session.destroy();
    respuesta.redirect("index.html");
	//respuesta.send("Sesion eliminada");
});


app.get("/ruta-restringida",verificarAutenticacion,  function(peticion, respuesta){
    console.log("Bienvenido");
    respuesta.send({est: 0, msj: "bienvenido"});
});

///Para agregar seguridad a una ruta especifica:
function verificarAutenticacion(peticion, respuesta, next){
	if(peticion.session.correo){
        return next();
    }
		
	else{
		respuesta.send({est: 1, msj: "restringida"});
    }
}


app.post("/guardar-codigo-archivo", function(peticion, respuesta){
    respuesta.cookie("codigo", peticion.body.codigo_archivo);
    respuesta.send({mensaje:"Se guardo la cookie"});
});

app.get("/obtener-codigo-archivo", function(peticion, respuesta){
    var cookieGuardada = peticion.cookies.codigo;
    respuesta.send({codigoArchivo:cookieGuardada});
});

app.get("/obtener-sesion", function(peticion, respuesta){
    respuesta.send("Valor de la variable de sesion almacenado: " + peticion.session.codigoUsuario);
 });



 app.get("/codigo-fuente", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT * FROM tbl_archivos WHERE codigo_archivo = ?`;
    var usuarios = [];
    conexion.query(sql, [request.cookies.codigo])
    .on("result", function(resultado){
        usuarios.push(resultado);
    })
    .on("end",function(){
        response.send(usuarios);
    });   
});


app.post("/nuevo-archivo", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `INSERT INTO 
               tbl_archivos(codigo_usuario, nombre_archivo, extension_archivo, contenido_archivo, codigo_carpeta) 
               VALUES (?,?,?,"",?)`;
    
    conexion.query(
        sql,
        [request.session.codigoUsuario, request.body.nombre_archivo, request.body.tipo_archivo, request.cookies.carpeta],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    ); 
});



app.post("/nueva-carpeta", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `INSERT INTO 
               tbl_carpetas(codigo_carpeta_padre, codigo_usuario, nombre_carpeta) 
               VALUES (?,?,?)`;
    
    conexion.query(
        sql,
        [request.cookies.carpeta, request.session.codigoUsuario, request.body.nombre_carpeta],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    ); 
});



app.post("/agregar-contacto", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql_insertar = 'INSERT INTO tbl_amigos(codigo_usuario, codigo_usuario_amigo) VALUES (?,?)';
    var sql_consultar = 'SELECT * FROM tbl_amigos WHERE codigo_usuario = ? and codigo_usuario_amigo = ?';
    
    conexion.query(sql_consultar,[request.session.codigoUsuario, request.body.codigo_contacto],function (err, data, fields) { 
        if(data.length>0){
            response.send({estatus:1, mensaje:"Ya tienes ese contacto."});
        }else{
            conexion.query(
                sql_insertar,
                [request.session.codigoUsuario, request.body.codigo_contacto],
                function(err, result){
                    if (err) throw err;
            
                    response.send(result);
                    
                }
            );
        }
     });  
});



app.get("/obtener-todos-usuarios", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT codigo_usuario, nombre, apellido, correo FROM tbl_usuarios`;
    var usuarios = [];
    conexion.query(sql, [request.session.codigoUsuario])
    .on("result", function(resultado){
        usuarios.push(resultado);
    })
    .on("end",function(){
        response.send(usuarios);
    });   
});



app.post("/cambiar-codigo-carpeta", function(peticion, respuesta){
    respuesta.cookie("carpeta", peticion.body.codigo_carpeta);
    respuesta.send({mensaje:"Se guardo la cookie"});
});



 app.get("/sesion",function(peticion, respuesta){
    respuesta.send({codigo:peticion.session.codigoUsuario, nombre:peticion.session.nombre, apellido:peticion.session.apellido, correo:peticion.session.correo, codigo_plan:peticion.session.codigo_plan});
	//respuesta.send("Sesion eliminada");
});
//Crear y levantar el servidor web.
app.listen(3000);
