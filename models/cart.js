const Sequelize = require('sequelize');

const sequelize = require('../util/database');

Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allNull: false,
        primaryKey: true,
    }
})

module.exports = Cart;

