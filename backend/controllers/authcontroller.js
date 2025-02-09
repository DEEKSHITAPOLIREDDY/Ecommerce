import User from "../models/usermodel.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from "../utils/generatetoken.js";
export const signup = async(req,res)=>{
    try {
       
        const {fullName,username,password,email}=req.body;
         
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"username already exist"})

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            email:email,
        })

        if(newUser){
        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email:newUser.email,
        });
        }else{
            res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" }); 
    }
} 

export const login=async(req,res)=>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({ error: "Invalid username or password" });
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email:user.email,
    });
    } catch (error) {
        console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
    }
};
export const logout=async(req,res)=>{
    try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};