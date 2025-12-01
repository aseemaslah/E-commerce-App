const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const cartRoute = require('./routes/cartRoute');
const billingRoute = require('./routes/billingRoute');

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');

mongoose.connection.once('open',()=>console.log('MongoDB connected'));

app.use('/products', productRoute);
app.use('/users' , userRoute);
app.use('/carts', cartRoute);
app.use('/billing', billingRoute);

const PORT = 3000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));