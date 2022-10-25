
import userModel from "../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import UserModel from "../models/userModel.js";

export const signin = async (req, res, next) => {

    const {email, password} = req.body;

    const user = await UserModel.verifyUser(email, password, next)
    res.status(200).json(user)
    try {
       /*  const user = await userModel.findOne({email})

        const verified = await bcrypt.compare(password, user.password )

        const error = new Error("Invalide Credentials")
        error.status = 401
        if(!verified) throw error
        
        // if(!verified) return next({message:"Invalid Credentials", status:401}) 
        
        res.status(200).json({message: "successfully logged in"}) */


    } catch (error) {
      next(error);
    }
  };

  export const signup = async (req, res, next) => {

    const {password, email} = req.body
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
       /*  const emailAvailable = await UserModel.findOne({email})
        if(emailAvailable) {
          const error = new Error("Email already registered")
          error.status = 401
          throw error 
        }
         */
        /* const saltCount = 10;
        const salt = await bcrypt.genSalt(saltCount)
        const hashedPassword = await bcrypt.hash(password, salt  )

        req.body.password = hashedPassword */

        const user = new userModel(req.body);
        await user.save();
        res.status(200).json(user);
      } catch (e) {
        next(e);
      }
  };