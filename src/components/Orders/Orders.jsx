import React from 'react';
import Cart from '../cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const cart=useLoaderData();
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product=> <ReviewItem
                    key={product.id}
                    product={product}
                    ></ReviewItem>)
                }
            </div>

            <div className='card-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Orders;