const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createError = require('http-errors');
const http = require('http').createServer(app)
const PORT = process.env.PORT || 5000;
const cors = require('cors');

require('dotenv').config();
require('./initDB')();

app.use(cors());
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methoads", 'PUT, POST, PUT, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
const io = require('socket.io')(http)
// // socket.io
io.on('connection', socket => {
    console.log('connection', socket.id);
})







const commentRouter = require('./Router/comment');
const userRouter = require('./Router/user');
const productRouter = require('./Router/product');
const menuRouter = require('./Router/menu');
const cardRouter = require('./Router/cart');
const adminRouter = require('./Router/admin');
const bannerRouter = require('./Router/banner');
const searchRouter = require('./Router/search');

app.use('/api/banner', bannerRouter);
app.use('/api/products', productRouter);
app.use('/api/user', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/menu', menuRouter);
app.use('/api/cart', cardRouter);
app.use('/api/admin', adminRouter);
app.use('/api/search', searchRouter);




app.use((req, res, next) => {
    next(createError(404, 'Not found'));
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});




http.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})