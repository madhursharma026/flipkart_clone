import './index.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link } from "react-router-dom"

function Footer() {
    return (
        <div>
            <div className="row pt-5 px-sm-4" style={{ backgroundColor: "#172337" }}>
                <div className="row col-lg-7">
                    <div className="col-3">
                        <ul style={{ listStyle: "none" }}>
                            <li style={{ color: "#807775", fontSize: "13px" }}>ABOUT</li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Contact Us</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>About Us</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Careers</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Flipkart Stories</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Press</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Flipkart Wholesale</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Corporate Information</Link></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul style={{ listStyle: "none" }}>
                            <li style={{ color: "#807775", fontSize: "13px" }}>HELP</li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Payments</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Shipping</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Cancellation & Returns</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>FAQ</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Report Infringement</Link></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul style={{ listStyle: "none" }}>
                            <li style={{ color: "#807775", fontSize: "13px" }}>POLICY</li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Return Policy</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Terms Of Use</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Security</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Privacy</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Sitemap</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>EPR Compliance</Link></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul style={{ listStyle: "none" }}>
                            <li style={{ color: "#807775", fontSize: "13px" }}>SOCIAL</li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Facebook</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>Twitter</Link></li>
                            <li><Link to="#footer_option" className="footer_options" style={{ color: "white", fontSize: "13px" }}>YouTube</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="row col-lg-5">
                    <div className="col-6">
                        <ul style={{ listStyle: "none" }}>
                            <li style={{ color: "#807775", fontSize: "13px" }}>Mail Us:</li>
                            <li style={{ color: "white", fontSize: "13px" }}>
                                Flipkart Internet Private Limited,
                                Buildings Alyssa, Begonia &
                                Clove Embassy Tech Village,
                                Outer Ring Road, Devarabeesanahalli Village,
                                Bengaluru, 560103,
                                Karnataka, India
                            </li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <ul style={{ listStyle: "none" }}>
                            <li style={{ color: "#807775", fontSize: "13px" }}>Registered Office Address:</li>
                            <li style={{ color: "white", fontSize: "13px" }}>
                                Flipkart Internet Private Limited,
                                Buildings Alyssa, Begonia &
                                Clove Embassy Tech Village,
                                Outer Ring Road, Devarabeesanahalli Village,
                                Bengaluru, 560103,
                                Karnataka, India
                                CIN : U51109KA2012PTC066107
                                Telephone: <Link to="#mobile_number" style={{ textDecoration: "none" }}>1800 202 9898</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr style={{ color: "white", marginTop: "25px", marginBottom: "15px" }} />
                <div className="row mt-2 mb-4 text-center">
                    <div className="row col-12 col-xl-8">
                        <div className="col-4 col-md">
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE2IDE1Ij4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB4Mj0iODYuODc2JSIgeTE9IjAlIiB5Mj0iODAuMjAyJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkQ4MDAiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkZBRjAwIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0yLTJoMjB2MjBILTJ6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTUuOTMgNS42MTRoLTIuOTQ4VjQuMTRjMC0uODE4LS42NTUtMS40NzMtMS40NzMtMS40NzNIOC41NmMtLjgxNyAwLTEuNDczLjY1NS0xLjQ3MyAxLjQ3M3YxLjQ3NEg0LjE0Yy0uODE4IDAtMS40NjYuNjU2LTEuNDY2IDEuNDc0bC0uMDA3IDguMTA1YzAgLjgxOC42NTUgMS40NzQgMS40NzMgMS40NzRoMTEuNzljLjgxOCAwIDEuNDc0LS42NTYgMS40NzQtMS40NzRWNy4wODhjMC0uODE4LS42NTYtMS40NzQtMS40NzQtMS40NzR6bS00LjQyMSAwSDguNTZWNC4xNGgyLjk0OHYxLjQ3NHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yIC0yKSIvPgogICAgPC9nPgo8L3N2Zz4K" alt="#" /><Link to="footer_options_with_img" style={{ fontSize: "14px", color: "white", textDecoration: "none" }}> Sell On Flipkart</Link>
                        </div>
                        <div className="col-4 col-md">
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE1IDE1Ij4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB4Mj0iODYuODc2JSIgeTE9IjAlIiB5Mj0iODAuMjAyJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkQ4MDAiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkZBRjAwIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0zLTNoMjB2MjBILTN6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTAuNDkyIDNDNi4zNTMgMyAzIDYuMzYgMyAxMC41YzAgNC4xNCAzLjM1MyA3LjUgNy40OTIgNy41QzE0LjY0IDE4IDE4IDE0LjY0IDE4IDEwLjUgMTggNi4zNiAxNC42NCAzIDEwLjQ5MiAzem0zLjE4IDEyTDEwLjUgMTMuMDg4IDcuMzI3IDE1bC44NC0zLjYwN0w1LjM3IDguOTdsMy42OS0uMzE1TDEwLjUgNS4yNWwxLjQ0IDMuMzk4IDMuNjkuMzE1LTIuNzk4IDIuNDIyLjg0IDMuNjE1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTMpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=" alt="#" /><Link to="footer_options_with_img" style={{ fontSize: "14px", color: "white", textDecoration: "none" }}> Advertise</Link>
                        </div>
                        <div className="col-4 col-md">
                            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxNyIgdmlld0JveD0iMCAwIDE4IDE3Ij4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAlIiB4Mj0iODYuODc2JSIgeTE9IjAlIiB5Mj0iODAuMjAyJSI+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRkQ4MDAiLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjRkZBRjAwIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPHBhdGggZD0iTS0xLTFoMjB2MjBILTF6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTYuNjY3IDVIMTQuODVjLjA5Mi0uMjU4LjE1LS41NDIuMTUtLjgzM2EyLjQ5NyAyLjQ5NyAwIDAgMC00LjU4My0xLjM3NUwxMCAzLjM1bC0uNDE3LS41NjdBMi41MSAyLjUxIDAgMCAwIDcuNSAxLjY2N2EyLjQ5NyAyLjQ5NyAwIDAgMC0yLjUgMi41YzAgLjI5MS4wNTguNTc1LjE1LjgzM0gzLjMzM2MtLjkyNSAwLTEuNjU4Ljc0Mi0xLjY1OCAxLjY2N2wtLjAwOCA5LjE2NkExLjY2IDEuNjYgMCAwIDAgMy4zMzMgMTcuNWgxMy4zMzRhMS42NiAxLjY2IDAgMCAwIDEuNjY2LTEuNjY3VjYuNjY3QTEuNjYgMS42NiAwIDAgMCAxNi42NjcgNXptMCA2LjY2N0gzLjMzM3YtNWg0LjIzNEw1LjgzMyA5LjAyNWwxLjM1Ljk3NSAxLjk4NC0yLjdMMTAgNi4xNjdsLjgzMyAxLjEzMyAxLjk4NCAyLjcgMS4zNS0uOTc1LTEuNzM0LTIuMzU4aDQuMjM0djV6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMSAtMSkiLz4KICAgIDwvZz4KPC9zdmc+Cg==" alt="#" /><Link to="footer_options_with_img" style={{ fontSize: "14px", color: "white", textDecoration: "none" }}> Gift Cards</Link>
                        </div>
                        <div className="col-12 col-md">
                            <span style={{ fontSize: "14px", color: "white", textDecoration: "none" }}> © 2007-2021 Flipkart.com</span>
                        </div>
                    </div>
                    <div className="col-12 col-xl-4">
                        <div className="col">
                            <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/payment-method_69e7ec.svg" alt="#" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Footer;




