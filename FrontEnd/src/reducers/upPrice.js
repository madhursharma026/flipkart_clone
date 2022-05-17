const initialStateList = {
    TotalPrice: 0,
    TotalItem: 0,
    listBuyData: []
}

function AddToCart(state = initialStateList, action) {
    switch (action.type) {
        case "INCREMENTITEM":
            const inCart = state.listBuyData.find((item) =>
                item.id === action.payload.id ? true : false
            );
            return {
                TotalPrice: state.TotalPrice + Number(action.payload.item_price),
                TotalItem: state.TotalItem + 1,
                listBuyData: inCart
                    ? state.listBuyData.map((item) => item.id === action.payload.id ? { id: action.payload.id, item_price: action.payload.item_price, item_image_url: action.payload.item_image_url, item_category_name: action.payload.item_category_name, item_name: action.payload.item_name, qty: item.qty + 1 } : item)
                    : [...state.listBuyData, { id: action.payload.id, item_price: action.payload.item_price, item_image_url: action.payload.item_image_url, item_category_name: action.payload.item_category_name, item_name: action.payload.item_name, qty: 1 }]
            }
        case "DECREMENTITEM":
            return {
                TotalPrice: state.TotalPrice - Number(action.payload.item_price),
                TotalItem: state.TotalItem - 1,
                listBuyData: state.listBuyData.some(obj => obj.id === action.payload.id && (obj.qty - 1) <= 0) ?
                    state.listBuyData.filter((elem) => elem.id !== action.payload.id)
                    :
                    state.listBuyData.map((item) => item.id === action.payload.id ? { id: action.payload.id, item_price: action.payload.item_price, item_image_url: action.payload.item_image_url, item_category_name: action.payload.item_category_name, item_name: action.payload.item_name, qty: item.qty - 1 } : item)
            }
        case "DELETEITEM":
            return {
                TotalPrice: state.TotalPrice - Number(action.payload.itemPrice * action.payload.itemQty),
                TotalItem: state.TotalItem - action.payload.itemQty,
                listBuyData: state.listBuyData.filter((elem) => elem.id !== action.payload.id)
            }
        case "CLEARCART":
            return {
                TotalPrice: 0,
                TotalItem: 0,
                listBuyData: []
            }
        default: return state
    }
}

export default AddToCart;

