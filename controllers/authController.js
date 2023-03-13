const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

singUp = async(req, res)=>{
   try{

    const user = new User({
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
        email: req.body.email,
        role: req.body.role
    });
    const savedUser = await user.save();

    res.status(200).send({
        status: 'OK ! You are Successfully Register',
        data: {
            savedUser
        }
    })
   }catch(error){
    console.log(error.message);
   }

}

singIn = async(req, res)=> {
    const email = req.body.email;
  try{
   
    const user = await User.findOne({email : email}).exec();

    if(!user){
        res.status(404).send({
            error: 'Email is not valid .'
        });
    }else{
        var passwordIsvalid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsvalid){
            res.status(401).send({
                accessToken: null,
                message: "Invalid Password"
            });
        }else{
            var token = jwt.sign({
                id: user.id
            },process.env.API_SECRET, {
                expiresIn:86400
            });
            res.status(200).send({
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email
                },
                message: "Login Successfully",
                accessToken: token,
            });
        }
    }
  }catch(error){
    console.log(error.message);
  }
}
module.exports = {
    singUp,
    singIn
}