module.exports=(sequelize,type)=>{
    const Count=sequelize.define('Counts',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        monto:{
            type:type.INTEGER,
            allownull:false
        }
    },{
        timestamps:false
    })
    return Count;
}