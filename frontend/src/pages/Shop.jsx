import React from "react";
import Hero from "../components/Hero/Hero" 
import Popular from "../components/popular/popular"
import Offers from "../components/Offers/Offers"
import NewCollections from "../components/NewCollections/NewCollections";
import News from "../components/newsletter/Newsletter";
import Footer from "../components/footer/footer";

const Shop = () =>{
    return (
        <div>
            <Hero />
            <Popular />
            <Offers />
            <NewCollections />
            <News />
        </div>
    )
};

export default Shop;