import mongoose from "mongoose";
import bcrypt from "bcrypt";
const {Schema}= mongoose;

const UserSchema= new Schema({
    name:{
        type: String,
    },
    email: {
        type: String,
        required: "email is required",
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: "password is required", 
    },
});


UserSchema.pre("save",function(next){
    let user = this;
    if(user.isModified("password")){
        return bcrypt.hash(user.password,12,function(err,hash){
            if(err){
                console.log(err);
                return next();
            }
            user.password=hash;
            return next();
        })
    }else return next();
});

UserSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

export default mongoose.model("user",UserSchema);