import './index.css';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link } from "react-router-dom"
import Header from './Header';
import Footer from './Footer';

function Homepage() {
    const [all_items, setAllItem] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/`).then((result) => {
            result.json().then((resp) => {
                setAllItem(resp)
                setloading(true)
            })
        })
    }, [])

    const setCategoryvalue = value => () => localStorage.setItem('category_id', value)


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
                        <div className="main_content" style={{ backgroundColor: "#F1F3F6" }}>
                            <div className="category_header" id="example1" style={{ height: "110px", background: 'white' }}>
                                <div className="row text-center">
                                    <div className="col mt-3 all_category_option" style={{ marginLeft: "-3px" }}>
                                        <Link to="/all_category_item" style={{ textDecoration: "none", color: "#484848" }}>
                                            <i className="fa fa-list-ul mt-3 mb-2 mb-lg-3" style={{ display: "block", fontSize: "24px" }}></i>
                                            <h6 style={{ fontSize: "14px" }}>All Category</h6>
                                        </Link>
                                    </div>
                                    <div className="col mt-3 mobiles_option" style={{ marginLeft: "-3px" }}>
                                        <Link style={{ textDecoration: "none", color: "#484848" }} to={{ pathname: '/category_item', id: '1', }} onClick={setCategoryvalue(1)}>
                                            <img className="category_logo" src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100" alt="#" />
                                            <h6 style={{ fontSize: "14px" }}>Mobiles</h6>
                                        </Link>
                                    </div>
                                    <div className="col mt-3 fashion_option" style={{ marginLeft: "-3px" }}>
                                        <Link style={{ textDecoration: "none", color: "#484848" }} to={{ pathname: '/category_item', id: '3', }} onClick={setCategoryvalue(3)}>
                                            <img className="category_logo" src="https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100" alt="#" />
                                            <h6 style={{ fontSize: "14px" }}>Fashion <i className="fa fa-angle-down"></i></h6>
                                        </Link>
                                    </div>
                                    <div className="col mt-3 electornics_option" style={{ marginLeft: "-3px" }}>
                                        <Link style={{ textDecoration: "none", color: "#484848" }} to={{ pathname: '/category_item', id: '6', }} onClick={setCategoryvalue(6)}>
                                            <img className="category_logo" src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100" alt="#" />
                                            <h6 style={{ fontSize: "14px" }}>Electronics <i className="fa fa-angle-down"></i></h6>
                                        </Link>
                                    </div>
                                    <div className="col mt-3 home_option" style={{ marginLeft: "-3px" }}>
                                        <Link style={{ textDecoration: "none", color: "#484848" }} to={{ pathname: '/category_item', id: '7', }} onClick={setCategoryvalue(7)}>
                                            <img className="category_logo" src="https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100" alt="#" />
                                            <h6 style={{ fontSize: "14px" }}>Home <i className="fa fa-angle-down"></i></h6>
                                        </Link>
                                    </div>
                                    <div className="col mt-3 appliances_option" style={{ marginLeft: "-3px" }}>
                                        <Link style={{ textDecoration: "none", color: "#484848" }} to={{ pathname: '/category_item', id: '8', }} onClick={setCategoryvalue(8)}>
                                            <img className="category_logo" src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100" alt="#" />
                                            <h6 style={{ fontSize: "14px" }}>Appliances <i className="fa fa-angle-down"></i></h6>
                                        </Link>
                                    </div>
                                    <div className="col mt-3 beauty_toys_and_more_option" style={{ marginLeft: "-3px" }}>
                                        <Link style={{ textDecoration: "none", color: "#484848" }} to={{ pathname: '/category_item', id: '5', }} onClick={setCategoryvalue(5)}>
                                            <img className="category_logo" src="https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100" alt="#" />
                                            <h6 style={{ fontSize: "14px" }}>Beauty, Toys & More</h6>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='real_content'>
                                <div id="trending_topic_carousel" className="carousel slide mt-3 mx-3" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <Link to="#carousel_item"><img src="https://trak.in/wp-content/uploads/2020/10/IMG_20201003_192653-1024x498.jpg" className="d-block" height="280px" width="100%" alt="#" /></Link>
                                        </div>
                                        <div className="carousel-item">
                                            <Link to="#carousel_item"><img src="https://assets.telegraphindia.com/telegraph/30flipkart_222946.jpg" className="d-block" height="280px" width="100%" alt="#" /></Link>
                                        </div>
                                        <div className="carousel-item">
                                            <Link to="#carousel_item"><img src="https://m.economictimes.com/thumb/msid-66611156,width-1200,height-900,resizemode-4,imgsize-835449/at-30-of-annual-revenues-flipkart-spends-thrice-as-much-on-ads-as-hul.jpg" className="d-block" height="280px" width="100%" alt="#" /></Link>
                                        </div>
                                        <div className="carousel-item">
                                            <Link to="#carousel_item"><img src="https://o3mdm.com/wp-content/uploads/2016/08/flipkart.jpg" className="d-block" height="280px" width="100%" alt="#" /></Link>
                                        </div>
                                        <div className="carousel-item">
                                            <Link to="#carousel_item"><img src="https://rukminim1.flixcart.com/flap/844/140/image/1efb7f9605058584.jpg?q=50" className="d-block" height="280px" width="100%" alt="#" /></Link>
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#trending_topic_carousel" data-bs-slide="prev" style={{ marginTop: "50px", marginBottom: "60px", width: "50px", background: "#484848" }}>
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#trending_topic_carousel" data-bs-slide="next" style={{ marginTop: "50px", marginBottom: "60px", width: "50px", background: "#484848" }}>
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>

                                <div className="mt-4 mx-1 pt-1" style={{ backgroundColor: "white" }}>
                                    <h4 className="mx-2 mt-2">Best Value Sale
                                        <Link to="/all_item" className="btn btn-primary" role="button" style={{ float: "right" }}>View All</Link>
                                    </h4>
                                    <hr />
                                    <div className="row">
                                        {
                                            all_items.map((all_item_details, i) =>
                                                <div className="col-6 col-md-3 text-center">
                                                    <Link style={{ color: "black", textDecoration: "none" }} to={{ pathname: '/category_item', id: all_item_details.item_category_id, }} onClick={setCategoryvalue(all_item_details.item_category_id)}>
                                                        <img src={all_item_details.item_image_url} alt="#" height="150px" width="auto" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                                                        <h6>{all_item_details.item_name}</h6>
                                                        <h2 style={{ fontSize: "22px" }}>₹{all_item_details.item_price}<img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="#" height="20px" style={{ marginLeft: "10px" }} /></h2>
                                                    </Link>
                                                </div>
                                            )
                                        }

                                    </div>
                                </div >
                                <br />
                            </div >
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

export default Homepage;




