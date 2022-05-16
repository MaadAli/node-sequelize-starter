/* eslint-disable import/no-import-module-exports */
import Cryptr from 'cryptr';
import db from '../../models/sequelize';
import config from '../../config/config';
import { RESPONSES, ERRORS } from '../../utils/responses';
import { generateToken } from '../../middleware/isAuthenticated';

const controller = {};

const { Users, AccessTokens } = db;

const cryptr = new Cryptr(config.cryptKey);

const { Op } = db.Sequelize;

controller.login = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user === undefined || user === null) {
      throw ERRORS.UNAUTHORIZED('Unauthorized');
    } else if (req.body.password !== cryptr.decrypt(user.password)) {
      throw ERRORS.UNAUTHORIZED('Invalid email or password');
    } else {
      const token = generateToken(user.id, '1h');

      const revokeTokens = await AccessTokens.update(
        { revoked: true },
        {
          where: {
            userId: user.id
          }
        }
      );
      const createToken = await AccessTokens.create({
        userId: user.id,
        token
      });

      if (!createToken) {
        throw ERRORS.UNAUTHORIZED('Invalid email or password');
      }
      return RESPONSES.GET_DATA_SUCCESS(res, null, { id: user.id, token });
    }
  } catch (error) {
    // console.log("err", error);
    next(error);
  }
};

controller.createUser = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ phoneNumber }, { email }]
      }
    });
    console.log('user', user);
    if (user && user !== undefined && user !== null) {
      throw ERRORS.UNIQUE_DATA('User already present with email/phoneNumber');
    } else {
      const savedUser = await Users.create({
        fullName,
        phoneNumber,
        email,
        password: cryptr.encrypt(password)
      });
      if (!savedUser) {
        throw ERRORS.FAILURE('User not created');
      }

      return RESPONSES.ADD_DATA_SUCCESS(res, 'User created successfully');
    }
  } catch (error) {
    // console.log("err", error);
    next(error);
  }
};

module.exports = controller;
