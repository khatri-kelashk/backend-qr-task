export const sendToken = async (user, statusCode, res, message) => {
    const {user_name, email} = user?._doc;
    const token = await user.getJWTToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly: true,
        // secure: true uncommit it when you have SSL in Frontend
    } 
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user: {user_name, email},
        message,
        token
    });
}