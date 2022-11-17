/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import userModel from '../models/user.model';

//registration new user
export const RegisterNewUser = async (body) => {
  const saltRounds = 10;
  const hashpassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashpassword;
  const data = await User.create(body);
  return data;
};

//login user
export const Userlogin=async(body)=>{
  const data = await User.findOne({EmailId:body.EmailId});
  if(data !== null){
    const result=await bcrypt.compare(body.password, data.password);
    if(result){
      var token=jwt.sign({EmailId:data.EmailId, id:data._id},
        process.env.SECRET_KEY);
      return token
    }
    else
    {
      throw new Error('invalid password');

    }
  }else
  {
    throw new Error('invalid email');
  }
};

//create new user
export const Registration = async (body) => {
  const exsit = await User.findOne({ EmailId: body.EmailId });
  if (exsit) {
    throw new Error('opps Email Exsit Already');
  } else {
    const data = await User.create(body);
    return data;
  }
};

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (_id) => {
  const data = await User.findById(_id);
  return data;
};
