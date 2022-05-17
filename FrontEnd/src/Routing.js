import './index.css';
import React from 'react'
import Header from './Header';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Homepage from './Homepage';
import CategoryItem from './CategoryItem';
import AllCategoryItem from './AllCategoryItem';
import Allitems from './Allitems';
import SingleItem from './SingleItem';
import CartData from './Cart';
import DescCategoryItem from './DescCategoryItem';
import DescAllCategoryItem from './DescAllCategoryItems';
import ResetPasswordForm from './ResetPasswordForm';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import MyWishlist from './MyWishlist';
import AddProduct from './AddProduct';
import MyOrders from './MyOrders';
import AdminAllItem from './AdminAllItem';
import AdminEditItem from './AdminEditItem';
import AdminUndeliveredItems from './AdminUndeliveredItems';
import AddBalance from './AddBalance';
import Login from './Login';
import Signup from './Signup';


function Routing() {
    return (
        <Router>
            <Route exact path="/">
                <div>
                    <Homepage />
                </div>
            </Route>
            <Route exact path="/home">
                <div>
                    <Homepage />
                </div>
            </Route>
            <Route exact path="/all_item">
                <div>
                    <Allitems />
                </div>
            </Route>
            <Route exact path="/category_item">
                <div>
                    <CategoryItem />
                </div>
            </Route>
            <Route exact path="/category_item_sort_desc_to_asc">
                <div>
                    <DescCategoryItem />
                </div>
            </Route>
            <Route exact path="/all_category_item">
                <div>
                    <AllCategoryItem />
                </div>
            </Route>
            <Route exact path="/all_category_item_sort_desc_to_asc">
                <div>
                    <DescAllCategoryItem />
                </div>
            </Route>
            <Route exact path="/single_item">
                <div>
                    <SingleItem />
                </div>
            </Route>
            <Route exact path="/cart">
                <div>
                    <CartData />
                </div>
            </Route>
            <Route exact path="/add_product">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <AddProduct />
                </div>
            </Route>
            <Route exact path="/login">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <Login />
                </div>
            </Route>
            <Route exact path="/signup">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <Signup />
                </div>
            </Route>
            <Route exact path="/reset_password">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <ResetPasswordForm />
                </div>
            </Route>
            <Route exact path="/change_password">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <ChangePassword />
                </div>
            </Route>
            <Route exact path="/edit_profile">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <EditProfile />
                </div>
            </Route>
            <Route exact path="/my_wishlist">
                <div>
                    <MyWishlist />
                </div>
            </Route>
            <Route exact path="/my_order">
                <div>
                    <MyOrders />
                </div>
            </Route>
            <Route exact path="/admin_all_items">
                <div>
                </div>
            </Route>
            <Route exact path="/admin_edit_item">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <AdminEditItem />
                </div>
            </Route>
            <Route exact path="/admin_undelivered_items">
                <div>
                    <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                        <div className="container-sm">
                            <Header />
                        </div>
                    </div>
                    <AdminUndeliveredItems />
                </div>
            </Route>
            <Route exact path="/my_balance">
                <div>
                    <AddBalance />
                </div>
            </Route>
        </Router>
    );
}
export default Routing;
