const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'r@jj0isGreat', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;