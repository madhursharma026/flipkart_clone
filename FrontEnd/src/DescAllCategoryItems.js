import './index.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom"
import Footer from './Footer';
import Header from './Header';

function DescAllCategoryItem() {
    const [loading, setloading] = useState(false)
    const [allcategory_item, setAllCategoryItem] = useState([])
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/all_category/sort=acs`).then((result) => {
            result.json().then((resp) => {
                setAllCategoryItem(resp)
                setloading(true)
            })
        })
    }, [])

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
                        <div className="container-lg" style={{ marginTop: "56px" }}>
                            <div className="category_details_before_991px">
                                <h2 style={{ marginLeft: "10px" }}>All Category
                                    <span style={{ float: "right", marginRight: "10px" }}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                Filter
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/all_category_item">Low to High</Dropdown.Item>
                                                <Dropdown.Item href="/all_category_item_sort_desc_to_asc">High to Low</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </span>
                                </h2>
                                <div className="row text-center">
                                    {
                                        allcategory_item.map((all_item_details, i) =>
                                            <div className="col-6 col-lg-4 col-xl-3" style={{ border: "1px solid 	#E0E0E0" }}>
                                                <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: '/category_item', id: all_item_details.item_category_id, }}>
                                                    <img className="mt-3" src={all_item_details.item_image_url} alt="#" height="auto" width="auto" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                                                    <h5 style={{ fontSize: "20px" }}>{all_item_details.item_name}</h5>
                                                    <h2 style={{ fontSize: "22px" }}>₹{all_item_details.item_price}<img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="#" height="20px" style={{ marginLeft: "10px" }} /></h2>
                                                    <h6 className="mx-1"><span className="px-1" style={{ background: "green", padding: "1px", borderRadius: "5px", fontWeight: "650", color: "white", fontSize: "12px" }}>{all_item_details.item_rating_star} <i className="fa fa-star" style={{ color: "yellow" }}></i></span><span style={{ marginLeft: "10px", color: "gray", fontWeight: "650" }}>{all_item_details.item_public_rating_count} Rating and {all_item_details.item_public_reviews_count} Reviews</span></h6>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="data_after_768px" style={{ background: "white" }}>
                                <h2 style={{ marginLeft: "10px" }}>All Category
                                    <span style={{ float: "right", marginRight: "10px" }}>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                Filter
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="/all_category_item">Low to High</Dropdown.Item>
                                                <Dropdown.Item href="/all_category_item_sort_desc_to_asc">High to Low</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </span>
                                </h2>
                                <div className="row text-center">
                                    {
                                        allcategory_item.map((all_item_details, i) =>
                                            <div className="col-6" style={{ border: "1px solid 	#E0E0E0" }}>
                                                <Link style={{ textDecoration: "none", color: "black" }} to={{ pathname: '/category_item', id: all_item_details.item_category_id, }}>
                                                    <img className="mt-3" src={all_item_details.item_image_url} alt="#" height="auto" width="auto" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                                                    <h5 style={{ fontSize: "20px" }}>{all_item_details.item_name}</h5>
                                                    <h2 style={{ fontSize: "22px" }}>₹{all_item_details.item_price}<img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="#" height="20px" style={{ marginLeft: "10px" }} /></h2>
                                                    <h6 className="mx-1"><span className="px-1" style={{ background: "green", padding: "1px", borderRadius: "5px", fontWeight: "650", color: "white", fontSize: "12px" }}>{all_item_details.item_rating_star} <i className="fa fa-star" style={{ color: "yellow" }}></i></span><span style={{ marginLeft: "10px", color: "gray", fontWeight: "650" }}>{all_item_details.item_public_rating_count} Rating and {all_item_details.item_public_reviews_count} Reviews</span></h6>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
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
    )
}

export default DescAllCategoryItem;




