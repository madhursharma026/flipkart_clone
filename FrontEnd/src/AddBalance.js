import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"
import Footer from './Footer';
import Header from './Header';

function AddBalance() {
    const [loading, setloading] = useState(false)
    const [mybalance, setmybalance] = useState(true)
    const history = useHistory()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const current_user = JSON.parse(localStorage.getItem("user-info"))
    const [BalanceToBeAdded, setBalanceToBeAdded] = useState(1)

    async function increase_payment_to_database() {
        let current_user_id = (current_user.id)
        let data = { current_user_id }
        let result = await fetch(`http://127.0.0.1:5000/increase_payment_to_database`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        setloading(true)
    }

    function final_payment(order_id) {
        handleClose()
        var options = {
            "key": "rzp_test_eFLNBga803LVUY", // Enter the Key ID generated from the Dashboard 
            "currency": "INR",
            "name": current_user.username,
            "description": "Add Balance",
            "image": "https://cdn.ndtv.com/tech/images/flipkart_money_thumb.jpg0",
            "order_id": order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                alert("Payment Added Successfully")
                setloading(false)
                increase_payment_to_database()
                setmybalance(mybalance + Number(BalanceToBeAdded))
            },
            "prefill": {
                "name": current_user.user,
                "email": current_user.email
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
            alert(response.error.reason);
        });
        rzp1.open();
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/my_balance/user_id:${current_user.id}`).then((result) => {
            result.json().then((resp) => {
                setmybalance(resp.result)
                setloading(true)
            })
        })
    }, [])

    async function GetOrderIDForAddBalance(e) {
        setloading(false)
        let current_user_id = (current_user.id)
        let amount = Number(BalanceToBeAdded)
        let data = { amount, current_user_id }
        let result = await fetch(`http://127.0.0.1:5000/getorderidforaddbalance`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        localStorage.setItem("OrderIdDetail", JSON.stringify(result))
        const OrderIdResult = JSON.parse(localStorage.getItem("OrderIdDetail"))
        setloading(true)
        final_payment(OrderIdResult.message)
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
                    <div className='text-center' style={{ marginTop: "110px" }}>
                        <h1>My Balance:- {mybalance}</h1>
                        <button type="button" className="btn btn-primary" onClick={handleShow}>Add Payment</button>
                        <Modal show={show} onHide={handleClose}>
                            <Form onSubmit={GetOrderIDForAddBalance}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Balance</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Add Amount</Form.Label>
                                        <Form.Control type="number" name="BalanceToBeAdded" required value={BalanceToBeAdded} onChange={(e) => setBalanceToBeAdded(e.target.value)} autoComplete="off" />
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button type="submit" variant="primary" className="w-100">
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal>
                        <br />
                    </div>
                    <div className='fixed-bottom'><Footer /></div>
                </div>
                :
                <div>
                    <div className="text-center" style={{ marginTop: "56px" }}>
                        <div className="spinner-border" role="status" style={{ marginTop: "150px" }}>
                            <span className="visually-hidden">Loading...</span><br />
                        </div>
                        <h3>Please WAit</h3>
                    </div>
                    <div className="fixed-bottom">
                        <Footer />
                    </div>
                </div>
            }
        </div >
    );
}

export default AddBalance;




