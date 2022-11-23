/* eslint-disable prettier/prettier */
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

/**
 * Controller to loginuser a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const Userlogin = async (req, res, next) => {
  try {
    const data = await UserService.Userlogin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    next(error);
  }
};



/**
controller to authorise the user for forgotten password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */

export const Forgotpwd=async(req,res)=>{
  try{
    const data=await UserService.Forgotpwd(req.body);
    res.status(HttpStatus.CREATED).json({
      code:HttpStatus.CREATED,
      data:data,
      message:'proceed further'
    });
  }catch(error){
    res.status(HttpStatus.BAD_REQUEST).json({
      code:HttpStatus.BAD_REQUEST,
      message:`${error}`
    });
  }
};

/**
controller to authorise the user for forgotten password
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 * */
 export const resetPassword=async(req,res)=>{
   try{
      const data=await UserService.resetPassword(req.body);
      res.status(HttpStatus.OK).json({
        code:HttpStatus.OK,
        data: data,
        message:'reset password is successfull'
      });
    }catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code:HttpStatus.BAD_REQUEST,
        message:`${error}`
      });
    }
  }