const User = require('../models/user');

async function handleGetAllUsers(req,res){
    const allData = await User.find({});
    return res.json(allData);
}

async function handleCreateUser(req,res){
    if(!req.body || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.gender){
       return res.json({msg:"All fields are required"});
    }
    else {
        await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
        });
        return res.json({msg: "User registered successfully"});
    }
}

async function handleGetUserById(req,res){
    const reqId = req.params.id;
    const reqUser = await User.findById(reqId);
    return res.json(reqUser);
}

async function handleDeleteUserById(req,res){
    const reqName = req.params.id;
    const reqDel =await User.find({firstName: reqName});
    
    if(reqDel.length<1){
        return res.json({msg:`No user found with name : ${reqName}`});
    }
    else {
     const result = await User.findByIdAndDelete(reqDel[0]._id);
      return res.json({msg: "User deleted successfully"} );
    }
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, {firstName: req.body.firstName, lastName: req.body.lastName,
        email: req.body.email, gender: req.body.gender});
        return res.json({msg: "User updated successfully"});
}


module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUserById,
    handleDeleteUserById,
    handleUpdateUserById,
}