import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/react-login")
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch(()=>{
    console.log("mongodb connection failed");
})

const newSchema=new mongoose.Schema({
    email: {
        type: String,
        required:true,
    },

    password: {
        type: String,
        required:true,
    }
})

const collection = mongoose.model("collection", newSchema)

export default collection