module.exports = (sequelize, DataTypes) => {
  const AccessTokens = sequelize.define('AccessTokens', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  AccessTokens.associate = function (models) {
    AccessTokens.belongsTo(models.Users, { as: 'user', foreignKey: 'userId' });
  };

  return AccessTokens;
};
