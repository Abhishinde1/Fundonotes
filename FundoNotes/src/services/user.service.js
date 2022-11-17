import User from '../models/user.model';
import bcrypt from 'bcrypt';

//registration new user
export const RegisterNewUser = async (body) => {
  const saltRounds = 10;
  const hashpassword = await bcrypt.hash(body.password, saltRounds);
  body.password = hashpassword;
  const data = await User.create(body);
  return data;
};

//create new user
export const Registration = async (body) => {
  const exsit = await User.findOne({ Username: body.Username });
  if (exsit) {
    throw new Error('opps Email Exsit Already');
  } else {
    const data = await User.create(body);
    return data;
  }
};
