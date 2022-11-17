import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to Register New User
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const RegisterNewUser = async (req, res, next) => {
  try {
    const data = await UserService.RegisterNewUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User Registration successfully'
    });
  } catch (error) {
    next(error);
  }
};
