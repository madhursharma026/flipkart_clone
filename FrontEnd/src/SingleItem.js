import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"
import Footer from './Footer';
import Header from './Header';
import { INCREMENTITEM } from "./actions/index"
import { useDispatch, useSelector } from "react-redux"

function SingleItem() {
    const dispatch = useDispatch();
    const history = useHistory()
    const single_item_id = localStorage.getItem('single_item_id');
    const [loading, setloading] = useState(false)
    const [ItemDetail, setItemDetail] = useState([])
    const current_user = JSON.parse(localStorage.getItem("user-info"))

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/item/id:${single_item_id}`).then((result) => {
            result.json().then((resp) => {
                setItemDetail(resp)
                setloading(true)
            })
        })
    }, [])

    async function add_wishlist(item_id) {
        let current_user_id = (current_user.id)
        let data = { item_id, current_user_id }
        let result = await fetch(`http://127.0.0.1:5000/wishlist_item`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        localStorage.setItem("my-wishlist", JSON.stringify(result))
        const my_wishlist = JSON.parse(localStorage.getItem("my-wishlist"))
        if (my_wishlist.message !== "item_removed") {
            alert("Item Added To Wishlist")
        } else {
            alert("Item Removed")
        }
    }

    return (
        <div>
            <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                <div className="container-sm">
                    <Header />
                </div>
            </div>
            {loading ?
                <div>
                    <div>
                        <div>
                            {
                                ItemDetail.map((single_item_detail, i) =>
                                    <div className='single_item' style={{ backgroundColor: "#F1F3F6" }}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-5 text-center product_image">
                                                        <img src={single_item_detail.item_image_url} className="mb-2" alt="#" style={{ maxHeight: "400px", maxWidth: "100%" }} />
                                                        <br />
                                                        {
                                                            current_user ?
                                                                <>
                                                                    {
                                                                        current_user.user_status === "user" ?
                                                                            <p>
                                                                                <button type="button" className="btn btn-warning mt-2" style={{ fontSize: "18px", marginLeft: "10px", color: "white", width: "170px" }} onClick={() => (dispatch(INCREMENTITEM(single_item_detail.item_id, single_item_detail.item_price, single_item_detail.item_image_url, single_item_detail.item_category_name, single_item_detail.item_name)))}><i className="fa fa-shopping-cart"> ADD TO CART</i></button>
                                                                                <Link to="/cart">
                                                                                    <button type="button" className="btn mt-2" onClick={() => ((dispatch(INCREMENTITEM(single_item_detail.item_id, single_item_detail.item_price, single_item_detail.item_image_url, single_item_detail.item_category_name, single_item_detail.item_name))), history.push('/cart'))} style={{ fontSize: "18px", marginLeft: "10px", background: "#FB641B", color: "white", width: "170px" }}><i className="fa fa-flash"> Buy Now</i></button>
                                                                                </Link>
                                                                            </p>
                                                                            :
                                                                            <span></span>
                                                                    }
                                                                </>
                                                                :
                                                                <span></span>
                                                        }
                                                    </div>
                                                    <div className="col-md-7 product_details">
                                                        <p style={{ fontSize: "25px", fontWeight: "600" }}>
                                                            {
                                                                current_user ?
                                                                    <>
                                                                        {
                                                                            current_user.user_status === "user" ?
                                                                                <span onClick={() => add_wishlist(single_item_detail.item_id)} style={{ cursor: "pointer" }}><i className="fa fa-heart-o"></i>&emsp; </span>
                                                                                :
                                                                                <span></span>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <span></span>
                                                            }
                                                            {single_item_detail.item_name}<span style={{ fontWeight: "600", color: "gray", fontSize: "18px" }}>#JustHere</span></p>
                                                        <span className="px-1" style={{ background: "green", padding: "1px", borderRadius: "5px", fontWeight: "650", color: "white", fontSize: "12px" }}>{single_item_detail.item_rating_star} <i className="fa fa-star" style={{ color: "yellow" }}></i></span><span style={{ marginLeft: "10px", color: "gray", fontWeight: "650" }}>{single_item_detail.item_public_rating_count} Rating and {single_item_detail.item_public_reviews_count} Reviews<img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="#" height="20px" style={{ marginLeft: "20px" }} /></span>
                                                        <p className='mt-2'>Special price</p>
                                                        <h3 style={{ marginTop: "-15px" }}>₹{single_item_detail.item_price}</h3>
                                                        <h6>Available offers</h6>
                                                        <p style={{ fontSize: '14px' }}><i className="fa fa-tag" style={{ color: "lime" }}></i>&ensp;<span style={{ fontSize: "16px", fontWeight: '600' }}> Combo Offer</span> Buy 2 items save 5%;Buy 3 or more save 10%See all products T&C</p>
                                                        <p style={{ fontSize: '14px', marginTop: "-18px" }}><i className="fa fa-tag" style={{ color: "lime" }}></i>&ensp;<span style={{ fontSize: "16px", fontWeight: '600' }}> Combo Offer</span> Buy 2 items save 5%;Buy 3 or more save 10%See all products T&C</p>
                                                        <p style={{ fontSize: '14px', marginTop: "-18px" }}><i className="fa fa-tag" style={{ color: "lime" }}></i>&ensp;<span style={{ fontSize: "16px", fontWeight: '600' }}> Combo Offer</span> Buy 2 items save 5%;Buy 3 or more save 10%See all products T&C</p>
                                                        <p style={{ fontSize: '14px', marginTop: "-18px" }}><i className="fa fa-tag" style={{ color: "lime" }}></i>&ensp;<span style={{ fontSize: "16px", fontWeight: '600' }}> Combo Offer</span> Buy 2 items save 5%;Buy 3 or more save 10%See all products T&C</p>
                                                        <p style={{ fontSize: '14px', marginTop: "-18px" }}><i className="fa fa-tag" style={{ color: "lime" }}></i>&ensp;<span style={{ fontSize: "16px", fontWeight: '600' }}> Combo Offer</span> Buy 2 items save 5%;Buy 3 or more save 10%See all products T&C</p>
                                                        <p style={{ fontSize: '16px', marginTop: "-18px", fontWeight: "600" }}><Link to="#view_more" style={{ textDecoration: "none" }}>View 6 more offers</Link></p>
                                                        <img src="https://flipkartclonereactquery.herokuapp.com/static/media/supercoin.5fce5ae7.png" alt="#" height="200" />
                                                        <br /><br />
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Specifications</h3>
                                                                <hr />
                                                                <h6 className="card-subtitle mb-2">General</h6>
                                                                <p className="card-text">
                                                                    {single_item_detail.item_one_features}
                                                                </p>
                                                                <p className="card-text">
                                                                    {single_item_detail.item_two_features}
                                                                </p>
                                                                <p className="card-text">
                                                                    {single_item_detail.item_three_features}
                                                                </p>
                                                                <p className="card-text">
                                                                    {single_item_detail.item_four_features}
                                                                </p>
                                                                <p className="card-text">
                                                                    {single_item_detail.item_five_features}
                                                                </p>
                                                                <p className="card-text">
                                                                    {single_item_detail.item_six_features}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
                :
                <div>
                    <div className="text-center" style={{ marginTop: "56px" }}>
                        <div className="spinner-border" role="status" style={{ marginTop: "150px" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div className="fixed-bottom">
                        <Footer />
                    </div>
                </div>
            }
        </div>
    );
}

export default SingleItem;




