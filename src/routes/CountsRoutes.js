const express = require("express");
const { Usuarios,Cuentas } = require("../bd/Sequealize");
const app = express();

app.post("/counts",async(req,res)=>{
    if(req.body.monto && req.body.UserId ){
        const usuario = await Usuarios.findOne({ where: { id: req.body.UserId } });
        if (usuario) {
            const cuenta = await Cuentas.findOne({ where: { UserId: req.body.UserId } });
            if(!cuenta){
                Cuentas.create(req.body);
                res.status(200).json({ mensaje:'Cuenta creada correctamente' })
            }else{
                res.status(400).json({ mensaje:'No se ha podido crear la cuenta' })
            }

        }else{
            res.status(400).json({ mensaje:'El usuario no existe' })
        }
    }else{
        res.status(400).json({ error: 'Todos los campos deben estar llenos' })
    }
})

app.put("/counts", async (req, res) => {
    if(req.body.id){
        const usuario = await Usuarios.findOne({ where: { id: req.body.id } });
        if (usuario) {
            const cuenta = await Cuentas.findOne({ where: { UserId: usuario.id } });
            if(cuenta && cuenta.monto>req.body.monto){
                Cuentas.update(
                    {
                        monto: cuenta.monto-req.body.monto
                    },
                    { 
                        where: 
                        {
                            id: cuenta.id
                        }
                    }
                ).then(() => { res.json({ mensaje:'Cuenta Actualizada'});}
                ).catch((error) => { throw new Error(error)});
            }else{
                res.status(400).json({ mensaje:'La cuenta no existe o no hay el dinero suficiente' })
            }

        } else {
            res.status(400).json({ mensaje:'El Usuario no Existe' })
        }
    }else{
        res.status(400).json({ error: 'No hay id' })
    }
});

module.exports = app;