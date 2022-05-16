import jwt from 'jsonwebtoken';
import config from '../config/config';
import { ERRORS } from '../utils/responses';
import db from '../models/sequelize';

const { authKey } = config;
const { Users, AccessTokens } = db;

const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, authKey);
      console.log('decoded', decoded);
      resolve(decoded);
    } catch (err) {
      reject(err);
    }
  });
};

export const generateToken = (userId, time) => {
  const token = jwt.sign(
    {
      id: userId
    },
    authKey,
    {
      expiresIn: time
    }
  );
  return token;
};

export const authenticateToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw ERRORS.UNAUTHORIZED('Unauthorized');
    }
    const token = req.headers.authorization.split(' ')[1];
    const tokenCheck = await AccessTokens.findOne({
      where: {
        token,
        revoked: 0
      }
    });

    if (!tokenCheck) {
      throw ERRORS.UNAUTHORIZED('Unauthorizeddd');
    }

    const { id } = await decodeToken(token);
    const user = await Users.findOne({ where: { id } });
    if (user) {
      req = Object.assign(req, { user: { id } });
      return next();
    }
    throw ERRORS.UNAUTHORIZED('Token not valid', null);
  } catch (err) {
    next(ERRORS.UNAUTHORIZED('Unauthorized', null));
  }
};
