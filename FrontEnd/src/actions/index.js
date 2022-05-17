export const INCREMENTITEM = (id, item_price, item_image_url, item_category_name, item_name) => {
    return {
        type: "INCREMENTITEM",
        payload: {
            id: id,
            item_price: item_price,
            item_image_url: item_image_url,
            item_category_name: item_category_name,
            item_name: item_name
        }
    }
}


export const DECREMENTITEM = (id, item_price, item_image_url, item_category_name, item_name) => {
    return {
        type: "DECREMENTITEM",
        payload: {
            id: id,
            item_price: item_price,
            item_image_url: item_image_url,
            item_category_name: item_category_name,
            item_name: item_name
        }
    }
}


export const DELETEITEM = (itemId, itemPrice, itemQty) => {
    return {
        type: "DELETEITEM",
        payload: {
            id: itemId,
            itemPrice: itemPrice,
            itemQty: itemQty
        }
    }
}


export const CLEARCART = () => {
    return {
        type: "CLEARCART"
    }
}


