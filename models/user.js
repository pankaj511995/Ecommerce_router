const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const musql= sequelize.define('user',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    email :{
        type:Sequelize.STRING,
        allowNull:false
    }
    
    // ,  
    // password :{
    //     type: Sequelize.INTEGER,
    //     allowNull:false
    // }
})

module.exports=musql;

