import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
      const { userId, itemId, size } = req.body;
      const userData = await userModel.findById(userId);
      let cartData = userData.cartData;
  
      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = { [size]: 1 };
      }
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Added to cart" });
      console.log("Adding to cart:", itemId, size);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

const getUserCart = async  (req,res)=>{
    try{
        const {userId}=req.body;
        const userData=await userModel.findById(userId);
        let cartData= await userData.cartData;
        res.json({success:true, cartData });
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message});
    }
}
const updateCart =async (req,res)=>{
    try{
        const {userId,itemId,size,quantity}=req.body;
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;       
        if(cartData[itemId][size]==0){
            delete cartData[itemId][size];
            if(cartData[itemId].length==0){
                delete cartData[itemId];
            }
        }
        
        cartData[itemId][size]=quantity;
        await userModel.findByIdAndUpdate(userId,{cartData});
        res.json({sucess:true,message:"Cart updated"});

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:error.message});
    }
}

export {addToCart, getUserCart, updateCart}