import './index.css';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"

function Login() {
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
            <div style={{ marginTop: "70px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg loginform_before_680px">
                <h1 className="mb-3 text-center"><u>Login</u></h1>
                <Form onSubmit={LoginSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="xyz123@gmail.com" name="LoginEmail" required value={LoginEmail} onChange={(e) => setLoginEmail(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="LoginPassword" value={LoginPassword} required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e) => setLoginPassword(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                    </Form.Text>
                    <h6 style={{ color: "blue", cursor: "pointer" }} onClick={handleShow}>Forget Password?</h6>
                    <Button variant="primary" type="submit" className="w-100 mt-3 mb-4">
                        Submit
                    </Button>
                    <div className="text-center">
                        <Link to="/signup" style={{ textDecoration: "none" }}>New to Flipkart? Create an account</Link>
                    </div>
                </Form>
            </div>
            <div style={{ marginTop: "110px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg loginform_after_680px">
                <h1 className="mb-3 text-center"><u>Login</u></h1>
                <Form onSubmit={LoginSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="xyz123@gmail.com" name="LoginEmail" required value={LoginEmail} onChange={(e) => setLoginEmail(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="LoginPassword" required value={LoginPassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={(e) => setLoginPassword(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                    </Form.Text>
                    <h6 style={{ color: "blue", cursor: "pointer" }} onClick={handleShow}>Forget Password?</h6>
                    <Button variant="primary" type="submit" className="w-100 mt-3 mb-4">
                        Submit
                    </Button>
                    <div className="text-center">
                        <Link to="/signup" style={{ textDecoration: "none" }}>New to Flipkart? Create an account</Link>
                    </div>
                </Form>
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

export default Login;




