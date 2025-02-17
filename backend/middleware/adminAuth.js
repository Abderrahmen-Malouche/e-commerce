import jwt from 'jsonwebtoken';

const adminAuth = (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({message:"Unauthorized"});
        }
        next();
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Server Error"});
    }
}

export default adminAuth;