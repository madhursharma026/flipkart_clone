import './index.css';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"

function Signup() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const history = useHistory()


    async function SignupSubmitForm(e) {
        e.preventDefault()
        let data = { email, name, username, password1, password2 }
        if (password1 === password2) {
            let result = await fetch("http://127.0.0.1:5000/signup", {
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
            if (user.message != "Email already exists.") {
                localStorage.clear()
                history.push("/login")
                alert("Confirmtion Email has sent")
            } else {
                localStorage.clear()
                alert("Email already exists.")
            }
        } else {
            alert("Password Does not match with earch other")
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
            <div style={{ marginTop: "70px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg signupform_before_680px">
                <h1 className="mb-3 text-center"><u>Signup</u></h1>
                <Form onSubmit={SignupSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="xyz123@gmail.com" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" name="name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="UserName" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" minLength="5" maxLength="10" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password1" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password1} onChange={(e) => setPassword1(e.target.value)} autoComplete="off" />
                        <Form.Text className="text-muted">
                            Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="passsword2" required value={password2} onChange={(e) => setPassword2(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I accept to the terms and condition" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-4">
                        Submit
                    </Button>
                    <div className="text-center">
                        <Link to="/login" style={{ textDecoration: "none" }}>Existing User? Login</Link>
                    </div>
                </Form>
            </div>
            <div style={{ marginTop: "110px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg signupform_after_680px">
                <h1 className="mb-3 text-center"><u>Signup</u></h1>
                <Form onSubmit={SignupSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="xyz123@gmail.com" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" name="name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="UserName" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" minLength="5" maxLength="10" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password1" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password1} onChange={(e) => setPassword1(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                    </Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" name="passsword2" required value={password2} onChange={(e) => setPassword2(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I accept to the terms and condition" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-4">
                        Submit
                    </Button>
                    <div className="text-center">
                        <Link to="/login" style={{ textDecoration: "none" }}>Existing User? Login</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Signup;




