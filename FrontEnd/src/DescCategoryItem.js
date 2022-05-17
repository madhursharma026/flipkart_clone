import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link } from "react-router-dom"
import Footer from './Footer';
import Header from './Header';

function DescCategoryItem() {
    const category_id = localStorage.getItem('category_id');
    const [category_item, setCAtegoryItem] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/category/id:${category_id}/sort=asc`).then((result) => {
            result.json().then((resp) => {
                setCAtegoryItem(resp)
                setloading(true)
            })
        })
    }, [])

    const set_single_item_id = value => () => localStorage.setItem('single_item_id', value)

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
                        <div style={{ marginTop: "56px", backgroundColor: "#F1F3F6" }}>
                            <div className="category_details_before_991px">
                                <div className='category_item_data row'>
                                    <div className='col-xl-3 mt-2 category_sidebar'>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Filters</h5>
                                                <hr style={{ color: "gray" }} />
                                                <ul className="list-group">
                                                    <li className="list-group-item">An item</li>
                                                    <li className="list-group-item">A second item</li>
                                                    <li className="list-group-item">A third item</li>
                                                    <li className="list-group-item">A fourth item</li>
                                                    <li className="list-group-item">And a fifth one</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 col-xl-9 mt-2'>
                                        <div className="card mx-4">
                                            {
                                                category_item.slice(0, 1).map((all_item_details, i) =>
                                                    <h2 style={{ marginLeft: "10px" }}>{all_item_details.item_category_name}
                                                        <span style={{ float: "right", marginRight: "10px" }}>
                                                            <Dropdown>
                                                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                                    Filter
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu>
                                                                    <Dropdown.Item style={{ background: "white" }}><Link style={{ textDecoration: "none" }} to={{ pathname: '/category_item', id: all_item_details.item_category_id, }}>Low to High</Link></Dropdown.Item>
                                                                    <Dropdown.Item style={{ background: "white" }}><Link style={{ textDecoration: "none" }} to={{ pathname: '/category_item_sort_desc_to_asc', id: all_item_details.item_category_id, }}>High to Low</Link></Dropdown.Item>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </span>
                                                    </h2>
                                                )
                                            }
                                            <ul className="list-group list-group-flush">
                                                {
                                                    category_item.map((all_item_details, i) =>
                                                        <Link style={{ textDecoration: "none" }} to={{ pathname: '/single_item', id: all_item_details.item_id, }} onClick={set_single_item_id(all_item_details.item_id)} >
                                                            <li className="list-group-item">
                                                                <br />
                                                                <div className="row">
                                                                    <div className="col-3 text-center">
                                                                        <img src={all_item_details.item_image_url} alt="#" height="auto" width="auto" style={{ maxWidth: "200px", maxHeight: "200px" }} />
                                                                    </div>
                                                                    <div className="col-md-5 col-xl-6">
                                                                        <h5 style={{ display: "inline", fontSize: "20px" }}>{all_item_details.item_name}</h5><br />
                                                                        <span className="px-1" style={{ background: "green", padding: "1px", borderRadius: "5px", fontWeight: "650", color: "white", fontSize: "12px" }}>{all_item_details.item_rating_star} <i className="fa fa-star" style={{ color: "yellow" }}></i></span><span style={{ marginLeft: "10px", color: "gray", fontWeight: "650" }}></span><span style={{ marginLeft: "10px", color: "gray", fontWeight: "650" }}>{all_item_details.item_public_rating_count} Rating and {all_item_details.item_public_reviews_count} Reviews</span>
                                                                        <ul style={{ marginLeft: "10px", marginTop: "10px", fontSize: "15px" }}>
                                                                            <li>{all_item_details.item_one_features}</li>
                                                                            <li>{all_item_details.item_two_features}</li>
                                                                            <li>{all_item_details.item_three_features}</li>
                                                                            <li>{all_item_details.item_four_features}</li>
                                                                            <li>{all_item_details.item_five_features}</li>
                                                                            <li>{all_item_details.item_six_features}</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="col-md-4 col-xl-3">
                                                                        <h2 style={{ fontSize: "22px" }}>₹{all_item_details.item_price}<img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="#" height="20px" style={{ marginLeft: "10px" }} /></h2>
                                                                    </div>
                                                                </div>
                                                                <br />
                                                            </li>
                                                        </Link>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="data_after_768px" style={{ background: "white" }}>
                                {
                                    category_item.slice(0, 1).map((all_item_details, i) =>
                                        <h2 style={{ marginLeft: "10px" }}>{all_item_details.item_category_name}
                                            <span style={{ float: "right", marginRight: "10px" }}>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                                        Filter
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item href="/category_item_sort_asc_to_desc">Low to High</Dropdown.Item>
                                                        <Dropdown.Item href="/category_item_sort_desc_to_asc">High to Low</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </span>
                                        </h2>
                                    )
                                }
                                <div className="row text-center">
                                    {
                                        category_item.map((all_item_details, i) =>
                                            <div className="col-6" style={{ border: "1px solid 	#E0E0E0" }}>
                                                <Link to={{ pathname: '/single_item', id: all_item_details.item_id }} onClick={set_single_item_id(all_item_details.item_id)} style={{ textDecoration: "none", color: "black" }}>
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
    );
}

export default DescCategoryItem;




