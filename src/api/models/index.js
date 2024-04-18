const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Device = require('./device')(sequelize, Sequelize.DataTypes);

// Set up relationships
User.hasMany(Device, { foreignKey: 'userId' });
Device.belongsTo(User, { foreignKey: 'userId' });

const db = {
    User,
    Device,
    sequelize, // instance of Sequelize
    Sequelize  // library itself
};

module.exports = db;
