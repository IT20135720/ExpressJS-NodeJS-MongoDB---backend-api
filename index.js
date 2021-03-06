require("dotenv").config();
const express=require("express");
const connectDB=require("./connection");
const userModel=require("./user");

const app=express();
app.use(express.json());

app.get("/",async(req,res)=>{
  try{
  const user=await userModel.find();
  return res.json({user});
  }
  catch(error){
    return res.status(500).json({ error: error.message });
  }
});

app.get("/user/type/:userType",async(req,res)=>{
  try{
  const {userType}=req.params;
  const user=await userModel.find({userType:userType});
  if(!user){
    return res.json({message:"No user found"});
  }
  
  return res.json({user});
  }
  catch(error){
  return res.status(500).json({ error: error.message });
  }
});

app.get("/user/:_id",async(req,res)=>{
  try{
  const {_id}=req.params;
  const user=await userModel.findById(_id);
  if(!user){
    return res.json({message:"No user found"});
  }
  
  return res.json({user});
}
catch(error){
  return res.status(500).json({ error: error.message });
}

});



app.post("/user/new",async(req,res)=>{
  try{
  const {newUser}=req.body;
  await userModel.create(newUser);
  return res.json({message:"User is created"});
  }
  catch(error){
    return res.status(500).json({ error: error.message });
  }
});

app.put("/user/update/:_id",async(req,res)=>{
  try{
      const {_id}=req.params;
      const {userData}=req.body;
      const updateUser=await userModel.findByIdAndUpdate(_id,{$set:userData},{new:true});
      return res.json({user:updateUser});
  }
  catch(error){
     return res.status(500).json({ error: error.message });
  }

});

app.delete("/user/delete/:_id",async(req,res)=>{
  try{
      const {_id}=req.params;
      await userModel.findByIdAndDelete(_id);
      return res.json({message:"User Deleted 😈"});
  }
  catch(error){
     return res.status(500).json({ error: error.message });
  }

});

app.delete("/user/delete/type/:usertype",async(req,res)=>{
  try{
      const {usertype}=req.params;
      await userModel.findOneAndDelete({type:usertype});
      return res.json({message:"User Deleted 😈"});
  }
  catch(error){
     return res.status(500).json({ error: error.message });
  }

});


app.listen(4000,() =>connectDB()
.then((data)=>console.log("Server is running"))
.catch((error)=>console.log(error))




);