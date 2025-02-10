import React from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import SubTitle from "../components/SubTitle"
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { products, currency,addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return productData ? (
    <div className="pt-10 border-t-2 border-gray-300 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col md:flex-row gap-12 ">
        {/* Image Gallery Section */}
        <div className="flex flex-1 flex-col-reverse md:flex-row gap-3">
          {/* Thumbnail Images (Stacked & Matching Main Image Height) */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-y-scroll justify-between md:justify-normal  w-full md:w-[18.7%]  ">
            {productData.image.map((img, index) => (
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                key={index}
                className="w-[24%] md:w-full md:mb-3 flex-shrink-0 cursor-pointer rounded-md hover:opacity-75 transition-opacity duration-200  "
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          {/* Main Image (Takes up the full available space) */}
          <div className="w-full md:w-[80%] ">
            <img
              src={image}
              alt="Selected product"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
        {/* Placeholder for additional content */}
        <div className="flex-1 px-6">
          <h1 class="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" width={15} />
            <img src={assets.star_icon} alt="" width={15} />
            <img src={assets.star_icon} alt="" width={15} />
            <img src={assets.star_icon} alt="" width={15} />
            <img src={assets.star_dull_icon} alt="" width={15} />
            <p className="pl-4">(122)</p>
          </div>
          <h1 className="font-semibold text-3xl mt-4">
            {currency}
            {productData.price}
          </h1>
          <p className="text-md mt-6 text-gray-500">
            {productData.description}
          </p>
          <h1 className="text-md mt-8 text-black">Select Size</h1>
          <div className="flex gap-4 items-center mt-4">
            {productData.sizes.map((size, index) => (
              <button
                className={`bg-gray-200 text-md py-2 px-3 border-[1px] aria-selected:border-orange-500 border-gray-300 cursor-pointer ${
                  selectedSize == size && "border-orange-700"
                } `}
                onClick={() => setSelectedSize(size)}
                key={index}
              >
                {size}
              </button>
            ))}
          </div>
          <button className="cursor-pointer text-white bg-black text-sm px-8 py-3 mt-6" onClick={()=>addToCart(productData._id,selectedSize)}>
            ADD TO CART{" "}
          </button>
          <hr className="bg-gray-200 h-[1px] w-full mt-8" />
          <div className="mt-6 flex gap-1 flex-col">
            <p className="text-sm  text-gray-500">100% Original product.</p>
            <p className="text-sm  text-gray-500">
              Cash on delivery is available on this product.
            </p>
            <p className="text-sm  text-gray-500">
              Easy return and exchange policy within 7 days.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24 ">
        <div className="flex flex-row text-sm">
          <h1 className="font-bold border-2 border-r-0 border-b-0 border-gray-200 px-3 py-2">
            Description
          </h1>
          <h1 className="border-2 border-gray-200 border-b-0 px-3 py-2">Reviews(122)</h1>
        </div>
        <div className="border-2 border-r-0 border-gray-200  text-sm
        px-6 py-6  text-gray-500 ">
          <p className="mb-2">

          An e-commerce website is an online platform that facilitates the
          buying and selling of products or services over the internet. It
          serves as a virtual marketplace where businesses and individuals can
          showcase their products, interact with customers, and conduct
          transactions without the need for a physical presence. E-commerce
          websites have gained immense popularity due to their convenience,
          accessibility, and the global reach they offer. 
          </p>
          <p>  
          E-commerce websites typically display products or services along with detailed
          descriptions, images, prices, and any available variations (e.g.,
          sizes, colors). Each product usually has its own dedicated page with
          relevant information.
          </p>
        </div>
      </div>
      <RelatedProducts subCategory={productData.subCategory} category={productData.category}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
