const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cors = require('cors');

const User = require('./models/User');
const app = express();
app.use(cors({
    credentials : true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
const port = 4040;
const mongoUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl, {
           
        });
        console.log('Database is connected');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};
connectDB()

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
    const {username, password} = req.body;
    try {
        const createUser = await User.create({username,password});
        jwt.sign({
            userId: createUser._id
        },jwtSecret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token', token).status(201).json('Ok');
        })
  
    } catch (err) {
        if(err) throw err;
        res.status(500).json('error');

    }
});
   


app.listen(port, console.log(`server is running on ${port}`));
