import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const { totalProducts } = useLoaderData();
    console.log(totalProducts);


    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const pageNumbers = [...Array(totalPages).keys()];


    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);


    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage]);


    useEffect(() => {
        const storedCart = getShoppingCart()
        // console.log(storedCart);
        const savedCart = [];

        // step-1 get id
        for (const id in storedCart) {

            //step-2 get the product by using id
            const addedProduct = products.find(product => product._id === id)
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
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const options = [5, 10, 20];

    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }

    return (
        <>
            <div className='shop-container'>

                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}

                        ></Product>)
                    }
                </div>

                <div className="card-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to='/orders'>
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>

            {/* pagination */}

            <div className='pagination'>
                <p> Current Page: {currentPage}, Items Per Page : {itemsPerPage}</p>
                {
                    pageNumbers.map(number =>
                        <button key={number}
                            onClick={() => setCurrentPage(number)}
                            className={currentPage === number ? 'selected' : ''}
                        >{number}
                        </button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option =>
                            <option key={option} value={option}>
                                {option}
                            </option>)
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;