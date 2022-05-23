const express = require('express');
const cors=require('cors');
const dotenv = require('dotenv');
const mongo = require('./Scraper/connect')
const scraping = require('./Scraper/data');
dotenv.config();
const {ObjectId} = require('mongodb');
mongo.connect()
const app = express();
PORT = 4025;

app.use(cors())

app.get("/", function (req, res) {
    res.send("web scraping");
  });



const getdata = async (req, res, next) => {
    try{
            
            const data = await mongo.SelectedDB.collection('productdata').find().toArray();
            res.send(data);
    }
    catch(err){
        console.log(err);
    }
}
app.use("/get",getdata)

const postdata = async(req, res,next) => {
    try{
        var Response =await mongo.SelectedDB.collection('productdata').insert(req.body);
        res.send(Response);
    }
    catch(err){
        console.log(err);
    }
}
app.post('/create', postdata)


scraping()
app.listen(PORT  || 3050);