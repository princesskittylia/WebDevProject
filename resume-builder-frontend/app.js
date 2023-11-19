import express, { json, urlencoded } from 'express';
import collection from './mongo.js';
import cors from 'cors';
const app = express();
app.use(json());
app.use(urlencoded({ extended:true }));
app.use(cors());

app.get("/", cors(), (req, res) => {

})

app.post("/", async(req, res) => {
    const{email, password}=req.body

    try {
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exists")
        }
        else {
            res.json("notexist")
        }
    } catch (e) {
        res.json("notexist")

    }

})

app.post("/signup", async(req, res) => {
    const{email, password}=req.body

    const data={
        email:email, 
        password:password
    }

    try {
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exists")
        }
        else {
            res.json("notexist");
            await collection.insertMany([data]);
        }
    } catch (e) {
        res.json("notexist")

    }


})

app.listen(3000,()=> {
    console.log("port listening");
})