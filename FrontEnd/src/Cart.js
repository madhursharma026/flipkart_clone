import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"
import Footer from './Footer';
import Header from './Header';
import { INCREMENTITEM, DECREMENTITEM, DELETEITEM, CLEARCART } from "./actions/index"
import { useDispatch, useSelector } from "react-redux"

function CartData() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.AddToCart.listBuyData);
    const TotalPrice = useSelector((state) => state.AddToCart.TotalPrice);
    const [show, setShow] = useState(false);
    const [loading, setloading] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history = useHistory()
    const [ItemDetail, setItemDetail] = useState([])
    const current_user = JSON.parse(localStorage.getItem("user-info"))
    const [AddAddress, setAddAddress] = useState(current_user.address)
    var t = new Date();
    t.setDate(t.getDate() + 3);
    var month = "0" + (t.getMonth() + 1);
    var date = "0" + t.getDate();
    month = month.slice(-2);
    date = date.slice(-2);
    var date = date + "/" + month + "/" + t.getFullYear();

    async function ChangeAddress() {
        setloading(false)
        let current_user_id = (current_user.id)
        let new_address = AddAddress
        let data = { current_user_id, new_address }
        let result = await fetch(`http://127.0.0.1:5000/change_address`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        localStorage.removeItem("user-info")
        localStorage.setItem("user-info", JSON.stringify(result))
        const user = JSON.parse(localStorage.getItem("user-info"))
        if (user.message != "") {
            setloading(true)
            history.push("/my_order")
        } else {
            alert("Something Went Wrong")
        }
    }

    async function add_to_database(listOfIds) {
        let current_user_id = (current_user.id)
        let data = { listOfIds, TotalPrice, current_user_id }
        let result = await fetch(`http://127.0.0.1:5000/delivery_data`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        alert("Item Buy Successfully")
        dispatch(CLEARCART())
        ChangeAddress()
    }

    function final_payment(e) {
        e.preventDefault()
        var answer = window.confirm("Pay From my Balance");
        if (answer) {
            add_to_database(list)
        }
    }

    function openmodal() {
        handleShow()
    }

    async function GetOrderID(TotalPaymentPrice) {
        setloading(false)
        let current_user_id = (current_user.id)
        let data = { TotalPaymentPrice, current_user_id }
        let result = await fetch(`http://127.0.0.1:5000/getorderid`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        if (result.message != "") {
            setloading(true)
            openmodal()
        } else {
            alert("Your Balance Is Smaller than Item Price... Please add your balance")
            history.push("/my_balance")
        }
    }


    return (
        <div>
            <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                <div className="container-sm">
                    <Header />
                </div>
            </div>
            <div>
                <div>
                    {(list.length != 0) ?
                        <div>

                            <div className='cart_data'>
                                <div className="container-xl">
                                    <div className="row">
                                        <div className="col-lg-7 col-xl-8 mt-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6 style={{ fontSize: '20px' }}>My Cart ({list.length})</h6>
                                                    <hr />
                                                    {
                                                        list.map((buy_item_id, i) =>
                                                            <>
                                                                <div className="row px-2">
                                                                    <div className="col-3 text-center">
                                                                        <img src={buy_item_id.item_image_url} alt="#" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <Link to="/single_item" style={{ textDecoration: 'none', fontWeight: '600', color: "black", fontSize: "18px" }}>
                                                                            {buy_item_id.item_name}
                                                                        </Link>
                                                                        <h6 style={{ fontWeight: '400', color: "gray", fontSize: "14px" }}>Category: {buy_item_id.item_category_name}<img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="#" height="20px" style={{ marginLeft: "20px" }} /></h6>
                                                                        <h4 style={{ fontSize: "17px" }}>₹{buy_item_id.item_price * buy_item_id.qty}/- Only!</h4>
                                                                    </div>
                                                                    <div className="col-3">
                                                                        <h6>Delivery in 2 days, {date}</h6>
                                                                        <p style={{ fontSize: "13px" }}>7 Days Replacement Policy</p>
                                                                    </div>
                                                                </div>
                                                                <button type="button" className="btn btn-light mx-2" style={{ borderRadius: "100%" }} onClick={() => (dispatch(DECREMENTITEM(buy_item_id.id, buy_item_id.item_price, buy_item_id.item_image_url, buy_item_id.item_category_name, buy_item_id.item_name)))}>-</button>
                                                                <input type="text" value={buy_item_id.qty} style={{ width: "40px", fontWeight: "600", marginTop: "50px" }} />
                                                                <button type="button" className="btn btn-light mx-2" style={{ borderRadius: "100%" }} onClick={() => (dispatch(INCREMENTITEM(buy_item_id.id, buy_item_id.item_price, buy_item_id.item_image_url, buy_item_id.item_category_name, buy_item_id.item_name)))}>+</button>
                                                                <Link to="#save_for_later" style={{ textDecoration: 'none', fontWeight: '600', color: "black", fontSize: "16px", marginLeft: "10px" }}>SAVE FOR LATER</Link>
                                                                <button type="button" className="btn" style={{ textDecoration: 'none', fontWeight: '600', color: "black", fontSize: "16px", marginLeft: "20px" }} onClick={() => (dispatch(DELETEITEM(buy_item_id.id, buy_item_id.item_price, buy_item_id.qty)))}>REMOVE</button>
                                                                <hr />
                                                            </>
                                                        )
                                                    }
                                                    <button type="button" className="btn mt-2" style={{ fontSize: "18px", float: "right", background: "#FB641B", color: "white", width: "170px" }} onClick={() => GetOrderID(TotalPrice)}>PLACE ORDER</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-5 col-xl-4 mt-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h6 style={{ fontSize: '20px', color: "gray" }}>Price Details</h6>
                                                    <hr />
                                                    <div className="row">
                                                        {
                                                            list.map((buy_item_price, i) =>
                                                                <>
                                                                    <div className="col-6" style={{ fontWeight: "600" }}>
                                                                        Price ({i + 1} item)
                                                                    </div>
                                                                    <div className="col-6" style={{ textAlign: "right", fontWeight: "600" }}>
                                                                        ₹ {buy_item_price.item_price * buy_item_price.qty}
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                        <div className="col-6" style={{ fontWeight: "600", marginTop: "10px" }}>
                                                            Delivery Charges
                                                        </div>
                                                        <div className="col-6" style={{ textAlign: "right", color: "green", fontWeight: "600", marginTop: "10px" }}>
                                                            Free
                                                        </div>
                                                        <hr style={{ marginTop: '10px' }} />
                                                        <div className="col-6" style={{ fontWeight: "650", fontSize: "20px" }}>
                                                            Total Amount
                                                        </div>
                                                        <div className="col-6" style={{ textAlign: "right", fontWeight: "650", fontSize: "20px" }}>
                                                            ₹ {TotalPrice}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <i className="fa fa-shield"></i> <span style={{ fontSize: "16px", color: 'gray', fontWeight: '600' }}>Safe and Secure Payments.Easy returns.100% Authentic products.</span>
                                        </div>
                                    </div>
                                    <div className='row text-center mt-5' style={{ borderTop: "1px solid black" }}>
                                        <div className="col-xl-7" style={{ color: "gray" }}>Policies:&ensp;
                                            <Link to='#return_policy' style={{ textDecoration: "none", color: "gray" }}>Returns Policy |</Link> <Link to='#terms_of_use' style={{ textDecoration: "none", color: "gray" }}>Terms of use |</Link> <Link to='#security' style={{ textDecoration: "none", color: "gray" }}>Security |</Link> <Link to='#privacy' style={{ textDecoration: "none", color: "gray" }}>Privacy |</Link> <Link to='#infringement' style={{ textDecoration: "none", color: "gray" }}>Infringement |</Link><br />© 2007-2021 Flipkart.com</div>
                                        <div className="col-xl-5">Need help? Visit the <Link to="#help_center">Help Center or Contact Us</Link></div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <Footer />
                        </div>
                        :
                        <div>
                            <div className="text-center" style={{ marginTop: "56px" }}>
                                <div style={{ marginTop: "150px" }}>
                                    <h1>No Data Found</h1>
                                </div>
                            </div>
                            <div className="fixed-bottom">
                                <Footer />
                            </div>
                        </div>
                    }
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={final_payment}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Address</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Register Email address</Form.Label>
                        <Form.Control type="text" placeholder="xyz123@gmail.com" pattern="(?=.*[a-z]).{8,}" name="AddAddress" required value={AddAddress} onChange={(e) => setAddAddress(e.target.value)} autoComplete="off" />
                    </Modal.Body>
                    <Form.Text className="text-muted mx-4">
                        Must contain House No. and colony address
                    </Form.Text>
                    <Modal.Footer>
                        <Button type="submit" variant="primary" className="w-100">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div >
    );
}

export default CartData;




