import './index.css';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"

function EditProfile() {

    const user = JSON.parse(localStorage.getItem("user-info"))
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [address, setAddress] = useState(user.address)
    const history = useHistory()

    async function EditProfileSubmitForm(e) {
        e.preventDefault()
        let current_user_id = (user.id)
        let data = { email, name, username, address, current_user_id }
        let result = await fetch("http://127.0.0.1:5000/edit_profile", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        result = await result.json()
        localStorage.clear()
        localStorage.setItem("user-info", JSON.stringify(result))
        alert("Profile Update Successfully")
    }

    return (
        <div>
            <div style={{ marginTop: "70px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg editform_before_680px">
                <h1 className="mb-3 text-center"><u>My Profile</u></h1>
                <Form onSubmit={EditProfileSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="xyz123@gmail.com" name="email" required value={email} disabled autoComplete="off" />
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
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="UserName" name="username" required value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-4">
                        Submit
                    </Button>
                </Form>
            </div>

            <div style={{ marginTop: "110px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg editform_after_680px">
                <h1 className="mb-3 text-center"><u>My Profile</u></h1>
                <Form onSubmit={EditProfileSubmitForm}>
                    <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="xyz123@gmail.com" name="email" required value={email} disabled autoComplete="off" />
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
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="UserName" name="username" required value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="off" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mb-4">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default EditProfile;




