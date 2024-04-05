import React, { createContext,useState,useEffect} from "react"


export const ShopContext = createContext(null)

const getdefaultcart = () =>{
    let cart = {}
    for(let index = 0 ; index < 301 ; index++){
        cart[index] = 0
    }
    return cart
}

const ShopContextProvider = (props) =>{
    const [all_product,setAllProducts] = useState([])
    const [cartItems, setcartItems] = useState(getdefaultcart)

    useEffect(()=>{
        fetch("http://localhost:4000/allproducts")
        .then((response)=>response.json())
        .then((data)=>setAllProducts(data))

        if (localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                },
                body:""
            }).then((response)=>response.json())
            .then((data)=>setcartItems(data))
        }
    },[])
    
    const addToCart = (itemId) =>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if (localStorage.getItem("auth-token")){
            fetch("http://localhost:4000/addtocart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }

    }
    const removeFromCart = (itemId) =>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch("http://localhost:4000/removefromcart",{
                method:"POST",
                headers:{
                    Accept:"application/form-data",
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }
    const getTotalCartAmount = () =>{
        let TotalAmount = 0
        for(let item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=>product.id===Number(item))
                TotalAmount += itemInfo.new_price * cartItems[item]
            }   
        }
        return TotalAmount
    }

    const getTotalCartItems = () =>{
        let TotalItems = 0
        for(let item in cartItems){
            if (cartItems[item] > 0){
                TotalItems += cartItems[item]
            }
        }
        return TotalItems
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart}


    return (
        <ShopContext.Provider value = {contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider