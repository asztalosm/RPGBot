const Users = require('./models/users');
const sequelize = require('./utils/database')

sequelize.sync({force: true});// these commands can reset the database
sequelize.sync({alter: true});