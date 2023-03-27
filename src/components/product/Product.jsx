import React from 'react';
import '../product/Product.css';

const Product = (props) => {
    const {img,name,seller,price,quantity}=props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <h6>{name}</h6>
       
        </div>
    );
};

export default Product;