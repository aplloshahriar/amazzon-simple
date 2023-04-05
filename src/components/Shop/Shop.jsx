import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);


    useEffect(() => {
        const storedCart = getShoppingCart()
        // console.log(storedCart);
        const savedCart=[];

        // step-1 get id
        for (const id in storedCart) {

            //step-2 get the product by using id
            const addedProduct = products.find(product => product.id === id)
            // console.log(savedProducts);
            if (addedProduct) {
                // step-3 get the quantity of the product
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                // step-4 add the addedProduct to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // step-5 set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // console.log(product);
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }

    const handleClearCart=()=>{
        setCart([]);
        deleteShoppingCart();
        }

    return (
        <div className='shop-container'>

            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}

                    ></Product>)
                }
            </div>

            <div className="card-container">
                <Cart 
                cart={cart}
                handleClearCart={handleClearCart}
                ></Cart>
            </div>
        </div>
    );
};

export default Shop;