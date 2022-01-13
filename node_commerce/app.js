const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cors = require('cors');
//app
const app = express();

// DB connection

mongoose.connect(process.env.DATABASE).then(()=>console.log("DB Connected"));

//middleweres

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routes middlewere

app.use("/api",authRoutes)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)

const port = process.env.PORT || 2000 ;

app.listen(port , ()=>{
    console.log(`Server is on port ${port}`);
});
