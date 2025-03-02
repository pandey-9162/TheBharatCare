const express=require('express');
const app=express();
const bookRoutes = require("./routes/bookRoutes.js")

const port=5000;

const mongoDB=require("./db");

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin',"http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json());
mongoDB();


app.use('/book',bookRoutes)

app.get('/',(req,res)=>{
    res.send("hello");
})



//  app.use('/api',require('./routes/createUser'))

app.listen(port,()=>{
    console.log(`listning on ${port}`)
})