/* eslint-disable prettier/prettier */
import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    Firstname: Joi.string().min(2).required(),
    Lastname: Joi.string().min(2).required(),
    EmailId: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
