import React, { useContext } from "react"
import "./productdisplay.css"
import star_icon from "../assets/star_icon.png"
import star_dull_icon from "../assets/star_dull_icon.png"
import { ShopContext } from "../../context/ShopContext"

const ProductDisplay = (props) =>{
    const { product } = props
    const {addToCart} = useContext(ShopContext)
    return(
        <div className="productdisplay">
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-main-image">
                    <img className="main-image" src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-star-img">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(143)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-oldprice">${product.old_price}</div>
                    <div className="productdisplay-right-newprice">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    Abric that adds to its durability and is highly breathable. For a Every Occasion 
                    Pump up your style statement with this slim-fit shirt on any formal or casual
                    occasion. Shirts will always come to your rescue when you are confused about
                    your outfit. Daily Wardrope If you heading for an important casual meeting, pair
                    this shirt with trousers and boots, and for a Sunday outing with friends or
                    family, team this shirt with a pair of jeans and sneakers and build your cool
                    and casual personality.
                </div>
                <div className="productdisplay-right-sizes">
                    <h1>Select Size</h1>
                    <div className="product-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category :</span>Women, T-shirt, CropTop</p>
                <p className="productdisplay-right-category"><span>Tags :</span>Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay