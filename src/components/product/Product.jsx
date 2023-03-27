import React from 'react';
import '../product/Product.css';

const Product = (props) => {
    // console.lof(props);
    const { img, name, seller, price, ratings } = props.product;
    const handleAddToCart=props.handleAddToCart;

   
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <h6 className='product-name'>{name}</h6>
                <p>Price:${price}</p>
                <p>Manufacturer{seller}</p>
                <p>Ratings:{ratings} star</p>
            </div>
            <button onClick={()=>handleAddToCart( props.product)} className='btn-cart'>Add To Cart</button>

        </div>
    );
};

export default Product;