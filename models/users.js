const Sequelize = require('sequelize');
const sequelize = require('../utils/database')

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    characterName: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    characterMaxHealth: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    characterStrength: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    characterDodge: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    characterDexterity: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    coins: {
        type: Sequelize.BIGINT,
        allowNull: true,
    }
});

module.exports = {Users};