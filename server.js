//Express
const express = require('express');
const app=express();
app.use(express.json())
const PORT = 3000;
const mongoose=require('mongoose');


//connecting mongodb
mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log("Error in DB is : ",err);
})

//creating Schema
const todoSchema=new mongoose.Schema({
    title:String,
    description:String,
})
//creating model
const todoModel= mongoose.model('Todo',todoSchema)

//create a new todo item
app.post('/todos',async(req,res)=>{
    const {title,description} = req.body;

try{
    const newTodo = new todoModel({title,description});
    await newTodo.save()
    res.status(201).json(newTodo);
}
catch(err){
        console.log(err); 
        res.status(500).json({message:"Error in creating new todo item"})
    }
})


//get all items
app.get("/todos",(req,res)=>{
    res.json('mongodb://localhost:27017/mern-app')
})















//Start the server
app.listen(PORT,()=>{
    console.log("Server is running on PORT: ",PORT);
})