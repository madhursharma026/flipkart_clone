import './index.css';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"
import Header from './Header';
import Footer from './Footer';

function AdminAllItem() {
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem("user-info"))
    const [AllItems, setAllItems] = useState([])
    const [loading, setloading] = useState(false)

    async function DeleteProductFormSubmit(delete_item_id) {
        let ItemId = delete_item_id
        let data = { ItemId }
        let result = await fetch("http://127.0.0.1:5000/delete_item", {
            method: "Delete",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        const output = JSON.parse(localStorage.getItem("user-info"))
        alert("Product Delete Successfully")
        fetch("http://127.0.0.1:5000/all_items").then((result) => {
            result.json().then((resp) => {
                setAllItems(resp)
                setloading(true)
            })
        })
    }

    useEffect(() => {
        fetch("http://127.0.0.1:5000/all_items").then((result) => {
            result.json().then((resp) => {
                setAllItems(resp)
                setloading(true)
            })
        })
    }, [])

    {
        useEffect(() => {
            if (user.user_status == "user") {
                history.push("./")
            }
        })
    }

    const set_single_item_id = value => () => localStorage.setItem('single_item_id', value)
    const set_edit_item_id = value => () => localStorage.setItem('edit_item_id', value, 'edit_item_category_id', value)

    return (
        <div >
            <div style={{ marginTop: "70px" }} className="container-lg loginform_before_680px">
                <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                    <div className="container-sm">
                        <Header />
                    </div>
                </div>
                <div className='mx-2'>
                    {loading ?
                        <span>
                            {(AllItems != "") ?
                                <span>
                                    <h1 className="mb-3 text-center"><u>All Items</u></h1>
                                    <table className="table table-dark table-striped text-center">
                                        <thead>
                                            <tr className='row'>
                                                <th className='col-1 col-md-1 edit_item_s_no' scope="col">S.No</th>
                                                <th className='col-6 col-md-5 edit_item_item_name' scope="col">Item Name</th>
                                                <th className='col-md-1 edit_item_item_price' scope="col">Item Price</th>
                                                <th className='col-2 col-md-2 edit_item_item_category' scope="col">Item Catogory</th>
                                                <th className='col-md-1 edit_item_item_status' scope="col">Item Status</th>
                                                <th className='col-3 col-md-2 edit_item_item_action' scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                AllItems.map((all_item_details, i) =>
                                                    <tr>
                                                        <Link to='/single_item' className='row' onClick={set_single_item_id(all_item_details.item_id)} style={{ color: "white", textDecoration: "none" }}>
                                                            <th className='col-1 col-md-1 edit_item_s_no' scope="row">{i + 1}</th>
                                                            <td className='col-6 col-md-5 edit_item_item_name'>{all_item_details.item_name}</td>
                                                            <td className='col-md-1 edit_item_item_price'>{all_item_details.item_price}</td>
                                                            <td className='col-2 col-md-2 edit_item_item_category'>{all_item_details.item_category_name}</td>
                                                            <td className='col-md-1 edit_item_item_status'>{all_item_details.item_status}</td>
                                                            <td className='col-3 col-md-2 edit_item_item_action'>
                                                                <Link to="/admin_edit_item" className="btn btn-info mx-2" role="button" onClick={set_edit_item_id(all_item_details.item_id, all_item_details.item_category_id)}>Edit</Link>
                                                                <Link to="#delete_item" className="btn btn-warning" role="button" onClick={() => DeleteProductFormSubmit(all_item_details.item_id)}>Delete</Link>
                                                            </td>
                                                        </Link>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </span>
                                :
                                <div className="text-center" style={{ marginTop: "56px" }}>
                                    <div style={{ marginTop: "150px" }}>
                                        <h1>No Data Found</h1>
                                        <Link to="/add_product" className='btn btn-primary' style={{ textDecoration: "none" }}><span style={{ fontWeight: "650" }}>Add Product</span></Link>
                                    </div>
                                </div>
                            }
                        </span>
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
            </div>
            <div style={{ marginTop: "110px" }} className="container-lg loginform_after_680px mx-1">
                <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                    <div className="container-sm">
                        <Header />
                    </div>
                </div>
                {loading ?
                    <span>
                        {(AllItems != "") ?
                            <span>
                                <h1 className="mb-3 text-center"><u>All Items</u></h1>
                                <table className="table table-dark table-striped text-center">
                                    <thead>
                                        <tr className='row'>
                                            <th className='col-1 col-md-1 edit_item_s_no' scope="col">S.No</th>
                                            <th className='col-6 col-md-5 edit_item_item_name' scope="col">Item Name</th>
                                            <th className='col-md-1 edit_item_item_price' scope="col">Item Price</th>
                                            <th className='col-2 col-md-2 edit_item_item_category' scope="col">Item Catogory</th>
                                            <th className='col-md-1 edit_item_item_status' scope="col">Item Status</th>
                                            <th className='col-3 col-md-2 edit_item_item_action' scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            AllItems.map((all_item_details, i) =>
                                                <tr>
                                                    <Link to='/single_item' className='row' onClick={set_single_item_id(all_item_details.item_id)} style={{ color: "white", textDecoration: "none" }}>
                                                        <th className='col-1 col-md-1 edit_item_s_no' scope="row">{i + 1}</th>
                                                        <td className='col-6 col-md-5 edit_item_item_name'>{all_item_details.item_name}</td>
                                                        <td className='col-md-1 edit_item_item_price'>{all_item_details.item_price}</td>
                                                        <td className='col-2 col-md-2 edit_item_item_category'>{all_item_details.item_category_name}</td>
                                                        <td className='col-md-1 edit_item_item_status'>{all_item_details.item_status}</td>
                                                        <td className='col-3 col-md-2 edit_item_item_action'>
                                                            <Link to="/admin_edit_item" className="btn btn-info mx-2" role="button" onClick={set_edit_item_id(all_item_details.item_id)}>Edit</Link>
                                                            <Link to="#delete_item" className="btn btn-warning" role="button">Delete</Link>
                                                        </td>
                                                    </Link>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </span>
                            :
                            <div className="text-center" style={{ marginTop: "56px" }}>
                                <div style={{ marginTop: "150px" }}>
                                    <h1>No Data Found</h1>
                                    <Link to="/add_product" className='btn btn-primary' style={{ textDecoration: "none" }}><span style={{ fontWeight: "650" }}>Add Product</span></Link>
                                </div>
                            </div>
                        }
                    </span>
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
        </div>
    );
}

export default AdminAllItem;




