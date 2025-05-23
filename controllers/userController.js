import { User } from '../models/userSchema.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import { sendToken } from "../utils/jwtToken.js";
import ErrorHandler from '../middleware/error.js';


export const test = catchAsyncError(async (_req, res, _next) => {
    
    res.json({
        success: true,
        message: "User API is running!",
    });
});

export const register = catchAsyncError( async (req, res, next) => {
    const { user_name, email, password } = req.body;    
    if (!user_name || !email || !password) {
        return next(new ErrorHandler("Please fill full registration form!"));
    }
    const emailExist = await User.findOne({ email: email});
    if (emailExist) {
       return next(new ErrorHandler("Email already exists!")); 
    }
    const user = await User.create({ user_name, email, password});
    
    sendToken(user, 200, res, "User registered successfully!");
});

export const login = catchAsyncError( async (req, res, next) => {
    const { email, password } = req.body;    
    if ( !email || !password) {
        return next(new ErrorHandler("Please provide Email and Password!", 400));
    }
    const userExist = await User.findOne({ email: email}).select("+password");
    if (!userExist) {
       return next(new ErrorHandler("Invalid Email or Password!")); 
    }
    const isPasswordMatched = await userExist.comparePassword(password);
    if (!isPasswordMatched) {
        new ErrorHandler("Invalid Email or Password", 400);
    }
    sendToken(userExist, 200, res, "User logged in successfully!");
});

export const logout = catchAsyncError(async (_req, res, _next) => {
    res
        .status(201)
        .cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
        });
    res.json({
        success: true,
        message: "User logged out successfully!",
    });
});