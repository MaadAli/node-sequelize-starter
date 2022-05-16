/* eslint-disable import/no-dynamic-require */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';

const basename = path.basename(__filename);

const db = {};

let sequelize;
const mysqlConf = config.mysql;
if (mysqlConf.use_env_variable) {
  sequelize = new Sequelize(process.env[mysqlConf.use_env_variable], mysqlConf);
} else {
  sequelize = new Sequelize(mysqlConf.database, mysqlConf.username, mysqlConf.password, mysqlConf);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
