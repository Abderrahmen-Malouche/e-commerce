import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 =req.files.image1 && req.files.image1[0];
    const image2 =req.files.image2 && req.files.image2[0];
    const image3 =req.files.image3 && req.files.image3[0];
    const image4 =req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );  
   

    let imagesUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestSeller: bestSeller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };
    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product added Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const listProducts = async (req, res) => {
  try{
    const products = await productModel.find({});
    res.json({success:true, products});

  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const removeProduct = async (req, res) => {
  try{
    const id = req.body.id;
    await productModel.findByIdAndDelete(id);
    res.json({success:true, message:"Product removed successfully"});
  } 
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getSingleProduct = async (req, res) => {
  try{
  const productId=  req.body.id;
  const product = await productModel.findById(productId);
  res.json({success:true, product});
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { addProduct, listProducts, removeProduct, getSingleProduct };
