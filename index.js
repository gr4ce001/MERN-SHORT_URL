const express = require('express')
const {connectMongo}=require('./db')
const urlRoute=require('./routes/urlRoute')
const URL = require('./models/url')


const app= express();
const PORT=8001;

connectMongo('mongodb+srv://gr4ce001:killisai2005@cluster0.wqmguzz.mongodb.net/MERN-SHORT_URL').then(()=>{console.log(`mongoDB connected`)})

app.use(express.json())

app.use("/url",urlRoute)
app.get('/:shortid', async (req,res)=>{
    const shortid = req.params.shortid;

    await URL.findOneAndUpdate({
        shortid
    },{$push:{
        visitHistory:{ timestamp : Date.now()}
    }})

})

app.listen(PORT,()=>{console.log(`Server started at PORT : ${PORT}`)})