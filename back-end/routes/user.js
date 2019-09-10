var express = require('express');
var router = express.Router();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/signup', async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user){
    return res.send({
      message : false
  })
  }
  user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  return res.send([user]);
})

//login
router.post('/login', async(req,res)=>{
  const user = await User.findOne({email : req.body.email}); 

  if(!user){
      return res.send({
        message:false
      })
  }
  if(user){
      const verifyPassword = await bcrypt.compare(req.body.password, user.password);
      if(verifyPassword){
          const Token = user.generateAuthToken();
          return res.send({
            role : user.userRole,
            email: req.body.email,
            token: Token
          });
      }
      else{
          return res.status(404).send('Invalid Password');
      }        
  }
})




module.exports = router;
