import "./index.css";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

function AddProduct() {
  const lookup = [
    { id: 1, value: "Mobiles" },
    { id: 2, value: "Shoes" },
    { id: 3, value: "Fashion" },
    { id: 4, value: "Food" },
    { id: 5, value: "Sports" },
    { id: 6, value: "Electronic" },
    { id: 7, value: "Home" },
    { id: 8, value: "Appliances" },
  ];

  const [selected, setSelected] = useState(-1);
  const history = useHistory();
  const value = selected !== -1 && lookup[selected];
  const [ItemName, setItemName] = useState("");
  const [ItemPrice, setItemPrice] = useState("");
  const [ItemImageURL, setItemImageURL] = useState();
  const [ItemOneFeature, setItemOneFeature] = useState("");
  const [ItemTwoFeature, setItemTwoFeature] = useState("");
  const [ItemThreeFeature, setItemThreeFeature] = useState("");
  const [ItemFourFeature, setItemFourFeature] = useState("");
  const [ItemFiveFeature, setItemFiveFeature] = useState("");
  const [ItemSixFeature, setItemSixFeature] = useState("");
  const [ItemCategoryId, setItemCategoryId] = useState("");
  const [ItemCategoryName, setItemCategoryName] = useState("");
  const user = JSON.parse(localStorage.getItem("user-info"));

  async function AddProductForm(e) {
    e.preventDefault();
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
    let result = await fetch("http://127.0.0.1:5000/add_item", {
      method: "POST",
      body: formdata
    });
    result = await result.json();
    const output = JSON.parse(localStorage.getItem("user-info"));
    if (output.id != "Execution Failed") {
      alert("Product Added Successfully");
      setItemName("");
      setItemPrice("");
      setItemImageURL();
      setItemOneFeature("");
      setItemTwoFeature("");
      setItemThreeFeature("");
      setItemFourFeature("");
      setItemFiveFeature("");
      setItemSixFeature("");
      setItemCategoryId("");
      setItemCategoryName("");
      history.push("./");
    } else {
      alert("Something goes wrong");
      localStorage.removeItem("output");
    }
  }

  function AddCategoryValue(id, value) {
    if (id === undefined) {
      setItemCategoryId("1");
    } else {
      setItemCategoryId(id);
    }
    if (value === undefined) {
      setItemCategoryName("Mobiles");
    } else {
      setItemCategoryName(value);
    }
  }

  {
    useEffect(() => {
      if (user.user_status == "user") {
        history.push("./");
      }
    });
  }

  return (
    <div>
      <div
        style={{ marginTop: "70px", paddingLeft: "15%", paddingRight: "15%" }}
        className="container-lg loginform_before_680px"
      >
        <h1 className="mb-3 text-center">
          <u>Add Product</u>
        </h1>
        <Form onSubmit={AddProductForm}>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Item Name"
              name="ItemName"
              required
              value={ItemName}
              onChange={(e) => setItemName(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Item Price</Form.Label>
            <Form.Control
              type="number"
              name="ItemPrice"
              value={ItemPrice}
              required
              onChange={(e) => setItemPrice(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Item Image URL</Form.Label>
            <Form.Control
              type="file"
              required
              onChange={(e) => setItemImageURL(e.target.files[0])}
              accept="image/png, image/gif, image/jpeg"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Item One Feature</Form.Label>
            <Form.Control
              type="text"
              name="ItemOneFeature"
              value={ItemOneFeature}
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
              value={ItemTwoFeature}
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
              value={ItemThreeFeature}
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
              value={ItemFourFeature}
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
              value={ItemFiveFeature}
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
              value={ItemSixFeature}
              required
              onChange={(e) => setItemSixFeature(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <select
            onChange={(e) => setSelected(e.target.value)}
            value={selected}
            required
            style={{ width: "100%", fontSize: "20px" }}
          >
            {lookup.map((m, ix) => {
              return (
                <option key={m.id} value={ix}>
                  {m.value}
                </option>
              );
            })}
            ;
          </select>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 mb-4"
            onClick={() => AddCategoryValue(value.id, value.value)}
          >
            Submit
          </Button>
        </Form>
      </div>
      <div
        style={{ marginTop: "110px", paddingLeft: "15%", paddingRight: "15%" }}
        className="container-lg loginform_after_680px"
      >
        <h1 className="mb-3 text-center">
          <u>Add Product</u>
        </h1>
        <Form onSubmit={AddProductForm}>
          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Item Name"
              name="ItemName"
              required
              value={ItemName}
              onChange={(e) => setItemName(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Item Price</Form.Label>
            <Form.Control
              type="number"
              name="ItemPrice"
              value={ItemPrice}
              required
              onChange={(e) => setItemPrice(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Item Image URL</Form.Label>
            <Form.Control
              type="file"
              name="ItemImageURL"
              required
              onChange={(e) => setItemImageURL(e.target.files[0])}
              accept="image/png, image/gif, image/jpeg"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Item One Feature</Form.Label>
            <Form.Control
              type="text"
              name="ItemOneFeature"
              value={ItemOneFeature}
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
              value={ItemTwoFeature}
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
              value={ItemThreeFeature}
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
              value={ItemFourFeature}
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
              value={ItemFiveFeature}
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
              value={ItemSixFeature}
              required
              onChange={(e) => setItemSixFeature(e.target.value)}
              autoComplete="off"
            />
          </Form.Group>
          <select
            onChange={(e) => setSelected(e.target.value)}
            value={selected}
            required
            style={{ width: "100%", fontSize: "20px" }}
          >
            {lookup.map((m, ix) => {
              return (
                <option key={m.id} value={ix}>
                  {m.value}
                </option>
              );
            })}
            ;
          </select>
          <Button
            variant="primary"
            type="submit"
            className="w-100 mt-3 mb-4"
            onClick={() => AddCategoryValue(value.id, value.value)}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;


