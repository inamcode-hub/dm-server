module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
        deviceId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        deviceModel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lastOnline: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Active'
        },
        firmwareVersion: {
            type: DataTypes.STRING
        },
        ipAddress: {
            type: DataTypes.STRING
        },
        locationLatitude: {
            type: DataTypes.FLOAT
        },
        locationLongitude: {
            type: DataTypes.FLOAT
        },
        userId: { // Foreign key
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'devices'
    });

    return Device;
};
