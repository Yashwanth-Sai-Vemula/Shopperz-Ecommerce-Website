import React from "react"
import "./DescriptionBox.css"


const DescriptionBox = () =>{
    return (
        <div className="descriptionbox">
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">
                    Description
                </div>
                <div className="descriptionbox-nav-box fade">
                    Review (122)
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>
                An e-commerce website is a website that allows people to buy and sell physical goods, services, and digital products over the internet. It is an online portal that facilitates online transactions of goods and services through means of the transfer of information and funds over the internet.
                E-commerce websites can be online-only or have a physical presence as well. They typically require a website or digital storefront, plus a way to process payments digitally and ship orders to customers.
                </p>
                <p>
                E-commerce websites can be used to sell a wide variety of products, including clothing, electronics, books, and groceries. They can also be used to sell services, such as travel, insurance, and financial services.
                </p>
            </div>
        </div>
    )
}

export default DescriptionBox