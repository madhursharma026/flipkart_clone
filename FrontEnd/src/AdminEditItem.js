import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom"
import Footer from './Footer';
import Header from './Header';

function AdminEditItem() {
    const edit_item_category_id = localStorage.getItem('edit_item_category_id');
    const lookup = [
        { id: 1, value: 'Mobiles' },
        { id: 2, value: 'Shoes' },
        { id: 3, value: 'Fashion' },
        { id: 4, value: 'Food' },
        { id: 5, value: 'Sports' },
        { id: 6, value: 'Electronic' },
        { id: 7, value: 'Home' },
        { id: 8, value: 'Appliances' },
    ];

    const history = useHistory()
    const [selected, setSelected] = useState(edit_item_category_id);
    const value = selected !== -1 && lookup[selected - 1];
    const edit_item_id = localStorage.getItem('edit_item_id');
    const [loading, setloading] = useState(false)
    const [EditItemDetail, setEditItemDetail] = useState([])
    const [ItemName, setItemName] = useState("")
    const [ItemPrice, setItemPrice] = useState("")
    const [ItemImageURL, setItemImageURL] = useState("")
    const [ItemOneFeature, setItemOneFeature] = useState("")
    const [ItemTwoFeature, setItemTwoFeature] = useState("")
    const [ItemThreeFeature, setItemThreeFeature] = useState("")
    const [ItemFourFeature, setItemFourFeature] = useState("")
    const [ItemFiveFeature, setItemFiveFeature] = useState("")
    const [ItemSixFeature, setItemSixFeature] = useState("")
    const [ItemCategoryId, setItemCategoryId] = useState("")
    const [ItemCategoryName, setItemCategoryName] = useState("")
    const current_user = JSON.parse(localStorage.getItem("user-info"))

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/item/id:${edit_item_id}`).then((result) => {
            result.json().then((resp) => {
                setEditItemDetail(resp)
                setItemName(resp[0].item_name)
                setItemPrice(resp[0].item_price)
                setItemImageURL(resp[0].item_image_url)
                setItemOneFeature(resp[0].item_one_features)
                setItemTwoFeature(resp[0].item_two_features)
                setItemThreeFeature(resp[0].item_three_features)
                setItemFourFeature(resp[0].item_four_features)
                setItemFiveFeature(resp[0].item_five_features)
                setItemSixFeature(resp[0].item_six_features)
                setItemCategoryId(resp[0].item_category_id)
                setItemCategoryName(resp[0].item_category_name)
                setloading(true)
            })
        })
    }, [])


    function AddCategoryValue(id, value) {
        setItemCategoryId(id)
        setItemCategoryName(value)
    }

    async function EditProductFormSubmit(e) {
        e.preventDefault()
        let data = {
            ItemName,
            ItemPrice,
            ItemImageURL,
            ItemOneFeature,
            ItemTwoFeature,
            ItemThreeFeature,
            ItemFourFeature,
            ItemFiveFeature,
            ItemSixFeature,
            ItemCategoryId,
            ItemCategoryName,
        };
        let formdata = new FormData();
        formdata.append("ItemId", edit_item_id);
        formdata.append("ItemName", ItemName);
        formdata.append("ItemPrice", ItemPrice);
        formdata.append("ItemOneFeature", ItemOneFeature);
        formdata.append("ItemTwoFeature", ItemTwoFeature);
        formdata.append("ItemThreeFeature", ItemThreeFeature);
        formdata.append("ItemFourFeature", ItemFourFeature);
        formdata.append("ItemFiveFeature", ItemFiveFeature);
        formdata.append("ItemSixFeature", ItemSixFeature);
        formdata.append("ItemCategoryId", ItemCategoryId);
        formdata.append("ItemCategoryName", ItemCategoryName);
        formdata.append("ItemImageURL", ItemImageURL);
        let result = await fetch("http://127.0.0.1:5000/edit_item_details", {
            method: "PUT",
            body: formdata
        })
        result = await result.json()
        const output = JSON.parse(localStorage.getItem("user-info"))
        alert("Product Updated Successfully")
        history.push("./");
    }

    {
        useEffect(() => {
            if (current_user.user_status == "user") {
                history.push("./")
            }
        })
    }

    return (
        <div >
            <div style={{ marginTop: "70px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg loginform_before_680px">
                <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                    <div className="container-sm">
                        <Header />
                    </div>
                </div>
                <div className='mx-2'>
                    {loading ?
                        <span>
                            {(EditItemDetail != "") ?
                                <span>
                                    <h1 className="mb-3 text-center"><u>Edit Item</u></h1>
                                    {
                                        EditItemDetail.map((EditItemIdDetail, i) =>
                                            <div>
                                                <Form onSubmit={EditProductFormSubmit}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Item Name"
                                                            name="ItemName"
                                                            required
                                                            defaultValue={EditItemIdDetail.item_name}
                                                            onChange={(e) => setItemName(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Price</Form.Label>
                                                        <Form.Control
                                                            type="number"
                                                            name="ItemPrice"
                                                            defaultValue={EditItemIdDetail.item_price}
                                                            required
                                                            onChange={(e) => setItemPrice(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Image URL</Form.Label>
                                                        <Form.Control
                                                            type="file"
                                                            onChange={(e) => setItemImageURL(e.target.files[0])}
                                                            accept="image/png, image/gif, image/jpeg"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item One Feature</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ItemOneFeature"
                                                            defaultValue={EditItemIdDetail.item_one_features}
                                                            required
                                                            onChange={(e) => setItemOneFeature(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Two Feature</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ItemTwoFeature"
                                                            defaultValue={EditItemIdDetail.item_two_features}
                                                            required
                                                            onChange={(e) => setItemTwoFeature(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Three Feature</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ItemThreeFeature"
                                                            defaultValue={EditItemIdDetail.item_three_features}
                                                            required
                                                            onChange={(e) => setItemThreeFeature(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Four Feature</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ItemFourFeature"
                                                            defaultValue={EditItemIdDetail.item_four_features}
                                                            required
                                                            onChange={(e) => setItemFourFeature(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Five Feature</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ItemFiveFeature"
                                                            defaultValue={EditItemIdDetail.item_five_features}
                                                            required
                                                            onChange={(e) => setItemFiveFeature(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Item Six Feature</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="ItemSixFeature"
                                                            defaultValue={EditItemIdDetail.item_six_features}
                                                            required
                                                            onChange={(e) => setItemSixFeature(e.target.value)}
                                                            autoComplete="off"
                                                        />
                                                    </Form.Group>
                                                    <select
                                                        onChange={(e) => setSelected(Number(e.target.value) + 1)}
                                                        defaultValue={EditItemIdDetail.item_category_id - 1} required style={{ width: "100%", fontSize: "20px" }}>
                                                        {lookup.map((m, ix) => {
                                                            return <option
                                                                key={m.id}
                                                                value={ix}
                                                            >
                                                                {m.value}
                                                            </option>
                                                        })};
                                                    </select>
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        className="w-100 mt-3 mb-4"
                                                        onClick={() => { value != undefined ? AddCategoryValue(value.id, value.value) : AddCategoryValue(EditItemIdDetail.item_category_id, EditItemIdDetail.item_category_name) }}
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>
                                            </div>
                                        )
                                    }
                                </span>
                                :
                                <div className="text-center" style={{ marginTop: "56px" }}>
                                    <div style={{ marginTop: "150px" }}>
                                        <h1>No Data Found</h1>
                                        <Link to="/add_product" className='btn btn-primary' style={{ textDecoration: "none" }}><span style={{ fontWeight: "650" }}>Add Product</span></Link>
                                    </div>
                                </div>
                            }
                        </span>
                        :
                        <div>
                            <div className="text-center" style={{ marginTop: "56px" }}>
                                <div className="spinner-border" role="status" style={{ marginTop: "150px" }}>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            <div className="fixed-bottom">
                                <Footer />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div style={{ marginTop: "110px", paddingLeft: "15%", paddingRight: "15%" }} className="container-lg loginform_after_680px mx-1">
                <div className="fixed-top" style={{ backgroundColor: "#2874F0" }}>
                    <div className="container-sm">
                        <Header />
                    </div>
                </div>
                {loading ?
                    <span>
                        {(EditItemDetail != "") ?
                            <span>
                                <h1 className="mb-3 text-center"><u>Edit Item</u></h1>
                                {
                                    EditItemDetail.map((EditItemIdDetail, i) =>
                                        <div>
                                            <Form onSubmit={EditProductFormSubmit}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Name</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Item Name"
                                                        name="ItemName"
                                                        required
                                                        defaultValue={EditItemIdDetail.item_name}
                                                        onChange={(e) => setItemName(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Price</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        name="ItemPrice"
                                                        defaultValue={EditItemIdDetail.item_price}
                                                        required
                                                        onChange={(e) => setItemPrice(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Image URL</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        onChange={(e) => setItemImageURL(e.target.files[0])}
                                                        accept="image/png, image/gif, image/jpeg"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item One Feature</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="ItemOneFeature"
                                                        defaultValue={EditItemIdDetail.item_one_features}
                                                        required
                                                        onChange={(e) => setItemOneFeature(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Two Feature</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="ItemTwoFeature"
                                                        defaultValue={EditItemIdDetail.item_two_features}
                                                        required
                                                        onChange={(e) => setItemTwoFeature(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Three Feature</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="ItemThreeFeature"
                                                        defaultValue={EditItemIdDetail.item_three_features}
                                                        required
                                                        onChange={(e) => setItemThreeFeature(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Four Feature</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="ItemFourFeature"
                                                        defaultValue={EditItemIdDetail.item_four_features}
                                                        required
                                                        onChange={(e) => setItemFourFeature(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Five Feature</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="ItemFiveFeature"
                                                        defaultValue={EditItemIdDetail.item_five_features}
                                                        required
                                                        onChange={(e) => setItemFiveFeature(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Item Six Feature</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="ItemSixFeature"
                                                        defaultValue={EditItemIdDetail.item_six_features}
                                                        required
                                                        onChange={(e) => setItemSixFeature(e.target.value)}
                                                        autoComplete="off"
                                                    />
                                                </Form.Group>
                                                <select
                                                    onChange={(e) => setSelected(Number(e.target.value) + 1)}
                                                    defaultValue={EditItemIdDetail.item_category_id - 1} required style={{ width: "100%", fontSize: "20px" }}>
                                                    {lookup.map((m, ix) => {
                                                        return <option
                                                            key={m.id}
                                                            value={ix}
                                                        >
                                                            {m.value}
                                                        </option>
                                                    })};
                                                </select>
                                                <Button
                                                    variant="primary"
                                                    type="submit"
                                                    className="w-100 mt-3 mb-4"
                                                    onClick={() => { value != undefined ? AddCategoryValue(value.id, value.value) : AddCategoryValue(EditItemIdDetail.item_category_id, EditItemIdDetail.item_category_name) }}
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        </div>
                                    )
                                }
                            </span>
                            :
                            <div className="text-center" style={{ marginTop: "56px" }}>
                                <div style={{ marginTop: "150px" }}>
                                    <h1>No Data Found</h1>
                                    <Link to="/add_product" className='btn btn-primary' style={{ textDecoration: "none" }}><span style={{ fontWeight: "650" }}>Add Product</span></Link>
                                </div>
                            </div>
                        }
                    </span>
                    :
                    <div>
                        <div className="text-center" style={{ marginTop: "56px" }}>
                            <div className="spinner-border" role="status" style={{ marginTop: "150px" }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div className="fixed-bottom">
                            <Footer />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default AdminEditItem;




