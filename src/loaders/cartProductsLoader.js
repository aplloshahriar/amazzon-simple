import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader=async()=>{

    // if cart data is in database, you have to use async await
    const storedCart=getShoppingCart();
    const storedCartId=Object.keys(storedCart);

    console.log(storedCartId);

    const loadedProducts=await fetch(`http://localhost:5000/productsById`, {
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(storedCartId)
    });

    const products=await loadedProducts.json(); 

    console.log('productsById',products);

    const savedCart=[];

    for (const id in storedCart){
        const addedProduct=products.find(pd=>pd._id===id)
        if(addedProduct){
            const quantity=storedCart[id];
            addedProduct.quantity=quantity;
            savedCart.push(addedProduct);
        }
    }

    // if you return two things
    // return [products,savedCart]

    return savedCart;
}

export default cartProductsLoader;