import Joi from 'joi';

export default {
    createUser: {
        body: Joi.object({
            fullName: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required(),
        })
    },
}