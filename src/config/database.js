const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false, // toggle based on your preference
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

module.exports = sequelize;
