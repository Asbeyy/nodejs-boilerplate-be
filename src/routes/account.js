const express = require("express");
const router = express.Router();

const {Account, User} = require("../database/schemas/");
const hashPassword = require("../utils/sha256");
const { signToken, AuthenticateToken } = require("../utils/jtw");

router.route("/").get((req, res) => {
    res.send("Account route Online");
});

router.route("/register").post(async (req, res) => {
    const {email, password, name, surname} = req.body;

    if (!email || !password || !name || !surname){
        return res.status(400).json({success: false, message: "Missing required fields"})
    }

    const emailExists = await Account.findOne({email: email.trim().toLowerCase()});
    if(emailExists){
        return res.status(400).json({success: false, message: "Email already exists"})
    }

    const newAccount = new Account({
        email: email.trim().toLowerCase(),
        password: hashPassword(password),
        user: {
            name: name,
            surname: surname,
        },
    });

    const save = await newAccount.save()

    if (!save){
        return res.status(500).json({success: false, message: "Error saving account"})
    }

    res.status(200).json({success: true, message: "Account created successfully"})
});

router.route("/login").post(async (req, res) => {
    const {email, password} = req.body

    const searchAccount = await Account.findOne({
        email: email.toLowerCase(),
        password: hashPassword(password)
    })

    if (!searchAccount){
        return res.status(401).json({success: false, message: "Invalid credentials - Email or Password is incorrect"})
    }

    if (searchAccount.isVerified === false){
        return res.status(401).json({success: false, message: "Account hasn't been activated yet - Stay tuned"})
    }

    const token = signToken(email.toLowerCase(), hashPassword(password))

    res.status(200).json({success: true, message: 'Login succesfull', data: token})
});

router.route("/authenticate").get(async (req, res) => {
    

    const auth = await AuthenticateToken(req, res)
    
    if (!auth.success){
        return res.status(401).json({success: false, message: "Unauthorized Access"})
    }
    res.status(200).json({success: true, message: "Authorized Access", data: auth})
})

module.exports = router;
