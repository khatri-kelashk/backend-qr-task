export const catchAsyncError = (executeFuntion) => {
 return (req, res, next)=>{
    Promise.resolve(executeFuntion(req, res, next)).catch(next);
 }
}