const User = require("../models/userModel");
const bcrypt = require('bcrypt')


exports.userDetails = async(req,res) =>{
    let {id,password} = req.body
    try {
        const checkuser = await User.findById(id);
        if(!checkuser){
            return res.status(404).json({'msg':'user not found'});
        }
        await checkuser.updateOne({password:await bcrypt.hash(password,12) });
        res.status(200).json({'msg':'Password Rest Successfully'})
    } catch (error) {
        res.status(500).json({'msg':error})
    }
}