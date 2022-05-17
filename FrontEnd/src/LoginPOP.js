import './index.css';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"

function LoginPOP() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ForgetEmail, setForgetEmail] = useState("")
    const [LoginEmail, setLoginEmail] = useState("")
    const [LoginPassword, setLoginPassword] = useState("")
    const history = useHistory()

    async function LoginSubmitForm(e) {
        e.preventDefault()
        let data = { LoginEmail, LoginPassword }
        let result = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        localStorage.setItem("user-info", JSON.stringify(result))
        const user = JSON.parse(localStorage.getItem("user-info"))
        if (user.id != "none") {
            history.push("/")
        } else {
            alert("Login Unsuccessful. Please check email and password")
            setLoginPassword("")
            localStorage.clear()
        }
    }

    async function ForgetPassword(e) {
        e.preventDefault()
        let data = { ForgetEmail }
        let result = await fetch(`http://127.0.0.1:5000/forget_password`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        localStorage.setItem("user-info", JSON.stringify(result))
        const user = JSON.parse(localStorage.getItem("user-info"))
        if (user.id != "none") {
            alert("Email has sent to your register email address")
            setForgetEmail("")
            localStorage.clear()
            handleClose()
        } else {
            alert("You are not registered with us. Please sign up.")
            setForgetEmail("")
            localStorage.clear()
            handleClose()
        }
    }

    {
        useEffect(() => {
            if (localStorage.getItem("user-info")) {
                history.push("./")
            }
        })
    }

    return (
        <div>
            <div className='row' style={{ height: "500px" }}>
                <div className='loginleftsidebarbeforelgscrn col-lg-4 bg-primary' style={{ paddingLeft: "35px", paddingRight: "35px" }}>
                    <h3 className='text-light mt-4'>Login</h3>
                    <h6 className='mt-4' style={{ fontSize: "18px", color: "white" }}>Get access to your Orders, Wishlist and Recommendations</h6>
                    <img src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png' alt='#' style={{ marginTop: "80%", width: "100%" }} />
                </div>
                <div className='col-lg-8'>
                    <Form onSubmit={LoginSubmitForm}>
                        <div class="form-floating mb-3 mt-2">
                            <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" name="LoginEmail" required value={LoginEmail} onChange={(e) => setLoginEmail(e.target.value)} autoComplete="off" />
                            <label for="floatingInputEmail">Email address</label>
                        </div>
                        <div class="form-floating mb-3 mt-2">
                            <input type="password" class="form-control" id="floatingInputPassword" placeholder="121Password" name="LoginPassword" value={LoginPassword} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e) => setLoginPassword(e.target.value)} autoComplete="off" />
                            <label for="floatingInputPassword">Password</label>
                        </div>
                        <Form.Text className="text-muted">
                            Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                        </Form.Text>
                        <h6 style={{ color: "blue", cursor: "pointer", marginTop: "20px" }} onClick={handleShow}>Forget Password?</h6>
                        <Button variant="primary" type="submit" className="w-100 mt-3 mb-4">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={ForgetPassword}>
                    <Modal.Header closeButton>
                        <Modal.Title>Forget Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Register Email address</Form.Label>
                            <Form.Control type="email" placeholder="xyz123@gmail.com" name="ForgetEmail" required value={ForgetEmail} onChange={(e) => setForgetEmail(e.target.value)} autoComplete="off" />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary" className="w-100">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default LoginPOP;




