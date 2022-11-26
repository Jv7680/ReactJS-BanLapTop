import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';
import product from './product';
import cart from './cart';
import auth from './auth';
import user from './user'
// import productsNew from './productsNew';
// import productsLaptop from './productsLaptop';
import productsOffice from './productsOffice';
import productsTopDiscount from './productsTopDiscount'
import bill from './bill'
// import productsOther from './productsOther';
// import productRatings from './productRatings';
// import favorites from './favorites';
// import producers from './producers';
import productsTopBestProduct from './productsTopBestProduct'
import orders from './orders';
import loading from './loading';
import search from './search'
import addresses from './address';
import wishlist from './wishlist';

const appReducers = combineReducers({
    categories,
    auth,
    loading,
    products,
    product,
    productsOffice,
    productsTopDiscount,
    productsTopBestProduct,
    cart,
    bill,
    orders,
    search,
    addresses,
    user,
    wishlist
});

export default appReducers;