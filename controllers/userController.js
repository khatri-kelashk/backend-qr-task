import { User } from '../models/userSchema.js';
import { catchAsyncError } from '../middleware/catchAsyncError.js';
import ErrorHandler from '../middleware/error.js';

export const register = catchAsyncError( async (req, res, next) => {
    const { name, email, role, phone, password } = req.body;    
    if (!name || !email || !role || !password) {
        return next(new ErrorHandler("Please fill full registration form!"));
    }
    const emailExist = await User.findOne({ email: email});
    if (emailExist) {
       return next(new ErrorHandler("Email already exists!")); 
    }
    const user = await User.create({ name, email, phone, role , password});
    res.status(200).json({
        success: true, message: 'Registration successful', user
    });
})

export const login = () => {

}