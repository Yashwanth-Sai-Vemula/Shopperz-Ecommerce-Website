const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const env = require("dotenv")

const app = express()

app.use(express.json())
app.use(cors())
env.config()
//Database connection
const port = process.env.PORT
mongoose.connect("mongodb+srv://yashwanthnetha0:lZa8tQTG7xP5Ui5I@cluster0.cyterdz.mongodb.net/mydatabase")
//Api creation
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//storing images using multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `https://shopperz-ecommerce-website.onrender.com/images/${req.file.filename}`
    })
})

// Schema for creating products

const Products = mongoose.model("product",{
    id: {
        type: Number,
        required: true,
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    available:{
        type:Boolean,
        default:true
    }
})

//creating endpoint for registering the user
app.post('/register',async (req,res) => {
    let check = await Users.findOne({email:req.body.email})
    if (check){
        return res.status(400).json({success:false,error:"user already exists with same email id"})
    }
    let cart = {}
    for (let i=0;i<300;i++) {
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,process.env.JWT_SECRET)
    res.json({success:true,token})
})
//creating endpoint for login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email})
    if (user){
        const passCompare = req.body.password === user.password
        if (passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
        }else{
            res.json({success:false,error:"Wrong Password"})
        }
    }else{
        res.json({success:false,error:"Wrong Email id or User Not registered"})
    }
})

//creating an endpoint to add product
app.post('/addproduct',async (req,res)=>{
    let products = await Products.find({})
    let id
    if(products.length>0){
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id + 1 
    }else{
        id = 1
    }
    const product = new Products({
        id : id,
        name : req.body.name,
        image : req.body.image,
        category : req.body.category,
        new_price : req.body.new_price,
        old_price : req.body.old_price
    })
    await product.save()
    console.log('saved')
    res.json({
        success:true,
        name:req.body.name
    })
})
//creating api for deleting products
app.post('/removeproduct',async (req,res)=>{
    await Products.findOneAndDelete({id:req.body.id})
    console.log("Removed")
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating api for getting all products
app.get('/allproducts',async (req,res)=>{
    let products = await Products.find({})
    console.log("All products Fetched")
    res.send(products)
})

//schema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String, 
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

//creating end point for new collections
app.get("/newcollections",async (req,res)=>{
    let products = await Products.find({});
    let newCollections = products.slice(1).slice(-8)
    console.log('newCollectons fetched')
    res.send(newCollections)
})

//creating end point for popular in women
app.get("/popularinwomen", async(req,res)=>{
    let products = await Products.find({category:"women"})
    let popular_in_women = products.slice(0,4)
    console.log("popular in women fetched")
    res.send(popular_in_women)
})
//creating a middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token')
    if (!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }else{
        try{
            const data = jwt.verify(token,'secret_ecom')
            req.user = data.user
            next()
        }catch(error){
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    } 
}
//creating endpoint for addcart
app.post("/addtocart", fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
})

//creating endpoint to remove product from cartData
app.post("/removefromcart",fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id})
    if (userData.cartData[req.body.itemId]>0){}
    userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")
})

//create endpoint to get cart data
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("getCart")
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
})

app.listen(port,(error)=>{
    if (!error){
        console.log(`server running on port ${port}`)
    }else{
        console.log(error)
    }
})
