const Sequelize=require('sequelize');
//import de los modelos
const Model_Cuentas=require('../models/Cuenta');
const Model_Usuarios=require('../models/Users');
//configuracion de la url de la bd
const sequelize = new Sequelize('bthjfpyzlqydbsyf8auc', 'ufxcucgalo6k3kjr', 'degpTjWVXq2sXkMjeDMo', {
    host: 'bthjfpyzlqydbsyf8auc-mysql.services.clever-cloud.com',
    dialect: 'mysql'
});
//creando la tablas tablas
const Cuentas=Model_Cuentas(sequelize,Sequelize);
const Usuarios=Model_Usuarios(sequelize,Sequelize);
//FK
Usuarios.hasMany(Cuentas)
Cuentas.belongsTo(Usuarios);
//sincronizando squelize
sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })
module.exports={
    Cuentas,
    Usuarios
}
