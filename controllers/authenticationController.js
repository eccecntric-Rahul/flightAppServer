import  UserModel  from "../model/UserModel";
import jwt from "jsonwebtoken";
const signUp=async (req,res)=>{ 
    try{
    console.log(req);
    if(!req.fields.name)return res.send("name is required");
    else if(!req.fields.password||req.fields.password.length<6)return res.status(400).send("password is required and should be atleast 6 charcters long");
    let userExist = await UserModel.findOne({email:req.fields.email}).exec();
    if(userExist)return res.status(400).send('Email already exists');
    let data = req.fields;
    let user= new UserModel(data);
    user.save((err,result)=>{
        if(err){
            console.log("Error saving user",err);
            res.status(400).send("Error saving user",err);
        }
        res.json(result)
    });
    
}catch(err){
    console.log(err);
    res.status(400).send(err);
}
}

const login = async(req,res)=>{
    const {email,password}=req.query;
    try{ 
         const responseUser = await UserModel.findOne({email}).exec();
         console.log(responseUser)
         if(responseUser)
        { 
        console.log(password)
         const resp = await responseUser.comparePassword(password);  
        if(resp==false)res.status(400).send("wrong Password");
        else{
            let token=jwt.sign({_id:responseUser._id},process.env.SECRET_KEY,{
                expiresIn: "7d",
            });
            res.json({token,user:{
                _id:responseUser._id,
                name:responseUser.name,
                emailAdd:responseUser.email,
            }});
        }
    }  else{
        res.status(404).send('No user found with that email')
    }  
        }catch(err){
            console.log(err);
        }
}




export default signUp;
export {login};