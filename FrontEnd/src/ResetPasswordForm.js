import './index.css';
import { Button, Form, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom"

function ResetPasswordForm() {
    const history = useHistory()
    const [newpassword, setNewPassword] = useState("")
    const [confirmnewpassword, setConfirmNewPassword] = useState("")

    function ResetPasswordSubmit(e) {
        e.preventDefault()
        let data = { newpassword }
        if (newpassword == confirmnewpassword) {
            let result = fetch("http://127.0.0.1:5000/reset_password", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            history.push("/login")
        } else {
            alert("Password Does not match with each other")
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
                <h1 className="mb-3 text-center"><u>Reset Password</u></h1>
                <Form onSubmit={ResetPasswordSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword" name="newpassword" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="off">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                    </Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicPassword" name="confirmnewpassword" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={confirmnewpassword} onChange={(e) => setConfirmNewPassword(e.target.value)} autoComplete="off">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <div style={{ marginTop: "70px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg loginform_after_680px">
                <h1 className="mb-3 text-center"><u>Reset Password</u></h1>
                <Form onSubmit={ResetPasswordSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword" name="newpassword" required value={newpassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={(e) => setNewPassword(e.target.value)} autoComplete="off">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        Must contain at least one number and UPPERCASE and lowercase letter, and at least 8 or more characters
                    </Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicPassword" name="confirmnewpassword" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" value={confirmnewpassword} onChange={(e) => setConfirmNewPassword(e.target.value)} autoComplete="off">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default ResetPasswordForm;




