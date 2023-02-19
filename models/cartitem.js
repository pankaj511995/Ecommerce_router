const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const musql= sequelize.define('cartItme',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    quantity :{
        type:Sequelize.INTEGER
       
    }
})

module.exports=musql;

