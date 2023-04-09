import { comparePasswords, hashPassword } from "../../utils.js";
import { userModel } from "../models/user.model.js";

export default class UsersManager{
  async getUser({email, password}){
    try {
      const user = await userModel.find({email});
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async addUser(props){
    try {
      const user = await userModel.create(props);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async changePassword(props){
    const { email, oldPassword, newPassword } = props;
    console.log(props);
    try {
      const user = await userModel.find({email});
 
      if(!user) return false;

      const isPassword = await comparePasswords(oldPassword, user[0].password);

      if(!isPassword) return false;

      const password = await hashPassword(newPassword);
      const passwordUpdated = await userModel.findOneAndUpdate({email}, {password}, {new: true});

      return passwordUpdated;
    } catch (err) {
      console.log(err);
    }
  }
}