import React, {useState,useContext,useRef} from "react";
import "./navbar.css";
import logo from "../assets/logo.png";
import cart_icon from "../assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import drop_down from "../assets/dropdown_icon.png"

const Navbar = () =>  {
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext)
    const menuRef = useRef();
    
    const dropDown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} />
                <p>SHOPPERZ</p>
            </div>
            <img className="nav-dropdown" alt="" onClick={dropDown_toggle} src={drop_down} />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={()=>{setMenu("shop")}}><Link to="/" style={{textDecoration: 'none'}}>Shop</Link> {menu === "shop" && <hr />}</li>
                <li onClick={()=>{setMenu("men")}}><Link to="/mens" style={{textDecoration: 'none'}}>Men</Link>{menu === "men" && <hr />}</li>
                <li onClick={()=>{setMenu("women")}}><Link to="/womens" style={{textDecoration: 'none'}}>Women</Link>{menu === "women" && <hr />}</li>
                <li onClick={()=>{setMenu("kids")}}><Link to="/kids" style={{textDecoration: 'none'}}>Kids</Link> {menu === "kids" && <hr />}</li>
            </ul>
            <div className="nav-login-menu">
                {localStorage.getItem('auth-token')?
                <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to="/login"><button>Login</button></Link>}
                <Link to="/cart"><img src={cart_icon} alt=""/></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

        </div>
    );
}

export default Navbar ;