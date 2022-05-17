import './index.css';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"

function SignupPOP() {
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
            <div>
                <div className='row' style={{ height: "600px" }}>
                    <div className='loginleftsidebarbeforelgscrn col-lg-4 bg-primary' style={{ paddingLeft: "35px", paddingRight: "35px" }}>
                        <h3 className='text-light mt-4'>SignUp</h3>
                        <h6 className='mt-4' style={{ fontSize: "18px", color: "white" }}>Sign up with your mobile number to get started</h6>
                        <img src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png' alt='#' style={{ marginTop: "80%", width: "100%" }} />
                    </div>
                    <div className='col-lg-8'>
                        <Form onSubmit={SignupSubmitForm}>
                            <div class="form-floating mb-3 mt-2">
                                <input type="email" class="form-control" id="floatingInputEmail" placeholder="xyz123@gmail.com" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                                <label for="floatingInputEmail">Email address</label>
                            </div>
                            <div class="form-floating mb-3 mt-2">
                                <input type="text" class="form-control" id="floatingInputFullName" placeholder="Full Name" name="name" required value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
                                <label for="floatingInputFullName">Full Name</label>
                            </div>
                            <div class="form-floating mb-3 mt-2">
                                <input type="text" class="form-control" id="floatingInputUsername" placeholder="UserName" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" minLength="5" maxLength="10" />
                                <label for="floatingInputUsername">Usernaem</label>
                            </div>
                            <div class="form-floating mb-3 mt-2">
                                <input type="password" class="form-control" id="floatingInputPassword" placeholder="121password" name="password1" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={password1} onChange={(e) => setPassword1(e.target.value)} autoComplete="off" />
                                <label for="floatingInputPassword">Passsword</label>
                                <Form.Text className="text-muted">
                                    Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                                </Form.Text>
                            </div>
                            <div class="form-floating mb-3 mt-2">
                                <input type="password" class="form-control" id="floatingInputConfirmPassword" placeholder="121password" name="passsword2" required value={password2} onChange={(e) => setPassword2(e.target.value)} autoComplete="off" />
                                <label for="floatingInputConfirmPassword">Confirm Password</label>
                            </div>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="I accept to the terms and condition" required />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mb-4">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPOP;




