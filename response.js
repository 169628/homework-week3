
const success = (req,res,posts)=>{
    res.send({
        status: "success",
        method: req.method,
        posts
    })
}

const falsed = (status,message,next)=>{
    const err = new Error(message);
    err.statusCode = status;
    err.name = "post err";
    next(err);
}

module.exports = { success , falsed}