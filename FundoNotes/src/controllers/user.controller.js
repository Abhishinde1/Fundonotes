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
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'User deleted successfully'
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
      console.log(data)
      res.status(HttpStatus.CREATED).json({
        code:HttpStatus.CREATED,
        data:data,
        message:'reset password is successfull'
      });
    }catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code:HttpStatus.BAD_REQUEST,
        message:`${error}`
      });
    }
  }