import Navbar from "./components/Navbar/Navbar";
import './App.css';
import { BrowserRouter,Routes,Route} from "react-router-dom";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/footer/footer";
import men_banner from "./components/assets/banner_mens.png"
import women_banner from "./components/assets/banner_women.png"
import kids_banner from "./components/assets/banner_kids.png"



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop/>}/>
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />}/>
          <Route path="/womens" element= {<ShopCategory banner={women_banner} category="women" />}/>
          <Route path="/kids" element={<ShopCategory banner={kids_banner} category="Kids"/>}/>
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/login" element={<LoginSignup />}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;