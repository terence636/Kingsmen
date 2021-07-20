// DEPENDENCIES
const express = require('express');
// const { route } = require('./room');
const router = express.Router();
const User = require("../models/users.js")
const bcrypt = require("bcrypt")

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
      return next();
    } else {
  
    //   res.redirect("/sessions/notAuth");
    res.render("sessions/notAuth.ejs");
    }
  };

router.get("/",(req,res)=>{
    res.send("ALL USERS INDEX")
})

router.get("/new",isAuthenticated,(req,res)=>{
    // res.send("USERS NEW PAGE")
    res.render("users/new.ejs",{})
})

router.post("/", (req,res)=>{
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(10)
    );

    User.create(req.body,(error,userCreated)=>{
        console.log(req.body)
        console.log(userCreated)
        res.redirect("/")
    })
    // res.send("TO MONGODB CREATE USER")
    
})


//   User.create(req.body, (error, user) => {
//     console.log("user", user);
//     res.redirect("/fruits");
//   });
module.exports = router