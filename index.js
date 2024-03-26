const express = require('express');
const userRouter = require('./routes/user');
const {connectMongoDB} = require('./connection')


const app = express();
const port = 8000;

app.use(express.urlencoded({extended:false}));
connectMongoDB('mongodb://127.0.0.1:27017/practice1').then(()=> console.log('DB connected...'));
app.use("/api/users", userRouter);
app.listen(port, ()=> console.log(`Server is running on : ${port}`));