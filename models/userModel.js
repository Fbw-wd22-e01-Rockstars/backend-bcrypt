import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
    
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next){

  try{
  const saltCount = 12
  const salt = await bcrypt.genSalt(saltCount)
  const hashedPassword = await bcrypt.hash(this.password, salt)
  this.password = hashedPassword

  next()

}catch(err){
  next(err)
}
})

UserSchema.post("save", function(next){
  console.log("document save")
})


UserSchema.statics.verifyUser = async (email, password, next) =>{

try{
    const user = await UserModel.findOne({email})
  const verified = await bcrypt.compare(password, user.password)
  if(!verified) {
    const err = new Error("Credentials are invalid!")
    err.status = 401
    throw err
  }
  user.password = undefined
  return user

} catch(err){
    next(err)
  }

}


const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
