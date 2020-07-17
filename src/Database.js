const { Sequelize } = require("sequelize");

    const sequelize = new Sequelize("db_ebutder","root","Ladera*610892",{
        host:"localhost",
        dialect:"mysql",
        define:{
            underscored:true,
            timestamps:false
        }
    });

    try{
        console.log("\n Database connection success!\n")
    }catch(error){
        console.log("\n Databse connection fail: ",error)
    }

    module.exports = sequelize;
