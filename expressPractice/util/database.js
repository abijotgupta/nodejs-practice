const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('NodejsApp', 'root', '***********', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;