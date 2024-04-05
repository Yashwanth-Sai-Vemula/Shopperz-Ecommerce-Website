import React from "react"
import "./Newsletter.css"

const News = () => {
    return(
        <div className="newsletter">
            <h1>Get Exclusive Offers on Your Email</h1>
            <p>Subscribe to our newsletter and Stay updated</p>
            <div className="input-field">
                <input type="email"  placeholder="Enter your Email" />
                <button type="submit">Subscribe</button>
            </div>
        </div>
    )
}

export default News