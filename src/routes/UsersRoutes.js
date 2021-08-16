const express = require("express");
const { Usuarios,Cuentas } = require("../bd/Sequealize");
const app = express();
const bcrypt = require('bcryptjs');
var moment = require('moment');
const jwt = require('jsonwebtoken');
app.post("/usuarios", async (req, res) => {
    if(req.body.nombre && req.body.direccion && req.body.email && req.body.password && req.body.tipo_usuario && req.body.numero){
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email)){
            const usuario = await Usuarios.findOne({ where: { email: req.body.email } });
            if(usuario){
                res.status(400).json({ error: 'Ya existe un usuario registrado con el email: ' + req.body.email })
            }
            else{
                req.body.password = bcrypt.hashSync(req.body.password, 10);
                Usuarios.create(req.body);
                res.status(200).json({success:"Usuario creado correctamente"});
            }
        }else{
            res.status(400).json({ error: 'Correo invalido ' + req.body.email })
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
});

app.post("/login",async(req,res)=>{
    if(req.body.email && req.body.password){
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email)){
            const usuario = await Usuarios.findOne({ where: { email: req.body.email } });
            if (usuario) {
                const iguales = bcrypt.compareSync(req.body.password, usuario.password);
                if (iguales) {
                    const token=await generarJWT(usuario.id,usuario.nombre)
                    res.status(200).json({ success: "login exitoso",token}); 
                } else {
                    res.status(400).json({ error: 'Error en usuario y/o contraseña' });
                }
            } else {
                res.status(400).json({ error: 'Error en usuario y/o contraseña' });
            }
        }else{
            res.status(400).json({ error: 'Correo invalido' });
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

const generarJWT=(id,nombre)=>{
    return new Promise((resolve,reject)=>{
        const payload={id,nombre};
        jwt.sign(payload,'secret-phrase',{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    })
}

app.post("/token",async(req,res)=>{
    const token=req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        })
    }

    try {
        const {id}=jwt.verify(
            token,
            'secret-phrase'
        );
        return res.status(200).json({ok:true,msg:'Token valido',id})
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no válido'
        })
    }


})




module.exports = app;