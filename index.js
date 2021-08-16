const express=require('express');
const app=express();
const cors=require('cors')
app.set('port',process.env.PORT || 3000);
app.use(express.json());
app.use(cors());
app.use(require('./src/routes/UsersRoutes'));
app.use(require('./src/routes/CountsRoutes'));
app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto',app.get('port'));
});