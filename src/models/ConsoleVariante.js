const {Model,DataTypes}  = require("sequelize");

class ConsoleVariante extends Model{
    static init(sequelize){
        super.init({
            id_console_variante:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
                
            },
            nome:DataTypes.STRING,
            id_console:DataTypes.INTEGER,
            status:DataTypes.CHAR
        },
        {
            sequelize,
            modelName:"ConsoleVariante",
            tableName:"tbl_console_variante",
            
        })
    }
}

module.exports = ConsoleVariante;