import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux"
import LoginPOP from './LoginPOP';
import SignupPOP from './SignupPOP';

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loginShow, setLoginShow] = useState(false);
  const [signUpShow, setSignUpShow] = useState(false);
  const handleShow = () => setShow(true);
  const TotalItem = useSelector((state) => state.AddToCart.TotalItem);
  const history = useHistory()
  const user = JSON.parse(localStorage.getItem("user-info"))
  const [searchdata, setSearchData] = useState(null)
  function getData(val) {
    fetch(`http://127.0.0.1:5000/search_item_realtime/search_data:${val.target.value}`).then((result) => {
      result.json().then((resp) => {
        setSearchData(resp)
      })
    })
  }

  function logout() {
    localStorage.clear()
    history.push("/home")
  }

  return (
    <div className="Header" style={{ backgroundColor: "#2874F0" }}>
      <div className="row">
        <div className="col-3 col-md-2 col-lg-2 col-xl-2 col-xxl-1 header_logo">
          <Link to="/"><img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png" alt="#" style={{ height: "20px", width: "74px" }} /></Link><p style={{ fontSize: "12px", marginTop: "-5px" }}><Link className="explore_plus" to="#explore_plus" style={{ color: "white" }}><i>Explore <span style={{ color: "yellow" }}>Plus</span></i> <i className="fa fa-plus" style={{ fontSize: "10px", color: "yellow" }}></i></Link></p>
        </div>
        <div className="col-md-4 col-lg-5 col-xl-6 col-xxl-7 header_search_bar">
          <input type="text" className="px-2" placeholder="Search for products, brand and more" style={{ marginRight: "30px", height: "35px", width: "90%", fontSize: "15px" }} onChange={getData} />
          <i className="fa fa-search search_btn" style={{ color: "blue" }}></i>
        </div>
        <div className="col-9 col-md-6 col-lg-5 col-xl-4 col-xxl-4 header_right_side_options">
          <p style={{ float: "right" }}>
            {
              localStorage.getItem("user-info") ?
                <Dropdown className="btn">
                  <Dropdown.Toggle id="dropdown-basic" className="text-primary py-1 px-4" style={{ marginRight: "20px", borderRadius: "0", backgroundColor: "white", fontWeight: "650", padding: "0", fontSize: "14px" }}>
                    {user.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      (user.user_status === "user") ?
                        <span>
                          <Link to="/change_password" className="dropdown_btn py-1" style={{ textDecoration: "none", display: "block", paddingLeft: "15px", color: "black" }}>Change Password</Link>
                          <Link to="/edit_profile" className="dropdown_btn py-1" style={{ textDecoration: "none", display: "block", paddingLeft: "15px", color: "black" }}>Edit Profile</Link>
                          <Link to="/my_wishlist" className="dropdown_btn py-1" style={{ textDecoration: "none", display: "block", paddingLeft: "15px", color: "black" }}>My Wishlist</Link>
                          <Link to="/my_order" className="dropdown_btn py-1" style={{ textDecoration: "none", display: "block", paddingLeft: "15px", color: "black" }}>My Order</Link>
                          <Link to="/my_balance" className="dropdown_btn py-1" style={{ textDecoration: "none", display: "block", paddingLeft: "15px", color: "black" }}>My Balance</Link>
                        </span>
                        :
                        <span></span>
                    }
                    {
                      (user.user_status === "admin") ?
                        <span>
                          <Link to="/admin_all_items" className="dropdown_btn py-1" style={{ textDecoration: "none", display: "block", paddingLeft: "15px", color: "black" }}>All Items</Link>
                          <Link to="/admin_undelivered_items" className="dropdown_btn py-1" style={{ textDecoration: "none", display: "block", paddingLeft: "15px", color: "black" }}>Undelivered Items</Link>
                        </span>
                        :
                        <span></span>
                    }
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                :
                <Dropdown className="btn">
                  <Dropdown.Toggle id="dropdown-basic" className="text-primary py-1 px-5" style={{ marginRight: "20px", borderRadius: "0", backgroundColor: "white", fontWeight: "650", padding: "0", fontSize: "14px" }}>
                    Login
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <button type="button" className="btn btn-light w-100" style={{ textAlign: "left" }} onClick={() => setLoginShow(true)}>Login</button>
                    <button type="button" className="btn btn-light w-100" style={{ textAlign: "left" }} onClick={() => setSignUpShow(true)}>SignUp</button>
                  </Dropdown.Menu>
                </Dropdown>
            }
            {
              localStorage.getItem("user-info") ?
                user.user_status == 'admin' ?
                  <span>
                    <Link to="/add_product" style={{ textDecoration: "none" }}><span style={{ fontWeight: "650", marginRight: "25px", color: "white" }}>Add Product</span></Link>
                  </span>
                  :
                  <span>
                    <Link to="#more" style={{ textDecoration: "none" }}><span style={{ fontWeight: "650", marginRight: "25px", color: "white" }}>More <i className="fa fa-angle-down"></i></span></Link>
                    <Link to="/cart" style={{ color: "white", fontSize: "16.25px", textDecoration: "none", fontWeight: "650" }}>
                      <span className="fa-stack" data-count={TotalItem}>
                        <i className="fa fa-shopping-cart"></i>
                      </span>
                      Cart</Link>
                  </span>
                :
                <span>
                  <Link to="#more" style={{ textDecoration: "none" }}><span style={{ fontWeight: "650", marginRight: "25px", color: "white" }}>More <i className="fa fa-angle-down"></i></span></Link>
                </span>
            }
          </p>
        </div>
        <div style={{ marginTop: "-5px", paddingBottom: "5px" }} className="searchbar_after_680px">
          <input type="text" className="px-3" placeholder="Search for products, brand and more" style={{ height: "35px", width: "96%", marginLeft: "2%", fontSize: "15px", marginRight: "2%" }} onChange={getData} />
        </div>
      </div>
      <Modal size="lg" show={loginShow} onHide={() => setLoginShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='py-0' style={{ paddingLeft: "12.75px" }}>
          <LoginPOP />
        </Modal.Body>
      </Modal>

      <Modal size="lg" show={signUpShow} onHide={() => setSignUpShow(false)} aria-labelledby="example-modal-sizes-title-lg" centered>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            SignUp
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='py-0' style={{ paddingLeft: "12.75px" }}>
          <SignupPOP />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;




