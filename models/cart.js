const Sequelize = require('sequelize');

const sequelize = require('../util/database');

Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allNull: false,
        primaryKey: true,
    }
})

module.exports = Cart;

