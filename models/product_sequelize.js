const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const musql= sequelize.define('product',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    title :{
        type:Sequelize.STRING,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false 
    },  
    price :{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        default:'not added'
    }  
})

module.exports=musql;