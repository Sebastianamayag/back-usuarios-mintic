module.exports=(sequelize,type)=>{
    const User=sequelize.define('Users',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        nombre:{
            type:type.STRING,
            allownull:false
        },
        direccion:{
            type:type.STRING,
            allownull:false
        }
        ,
        email:{
            type:type.STRING,
            allownull:false
        },
        password:{
            type:type.STRING,
            allownull:false
        },
        tipo_usuario:{
            type:type.STRING,
            allownull:false
        },
        numero:{
            type:type.INTEGER, 
            allownull:false
        }
    },{
        timestamps:false
    })
    return User;
}