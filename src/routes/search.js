const express = require("express");
const router = express.Router();

const {Account} = require("../database/schemas/");
const {AuthenticateToken } = require("../utils/jtw");

router.route("/").get((req, res) => {
    res.send("Search route Online");
});


router.route("/users/parameter/:search").get( async (req, res) => {
    
    const auth = await AuthenticateToken(req, res)

    if (!auth){
        return res.status(401).json({success: false, message: "Unauthorized"})
    }

    const {search} = req.params

    const searchLookup = await Account.find({
        $or: [
            {"user.name": {$regex: search, $options: "i"}},
        ]
    })

    return res.status(200).json({success: true, data: searchLookup})


})


router.route("/users/all").get( async (req, res) => {
   
    const auth = await AuthenticateToken(req, res)

    if (!auth){
        return res.status(401).json({success: false, message: "Unauthorized"})
    }

    const searchLookup = await Account.find({})

    return res.status(200).json({success: true, data: searchLookup})
})



module.exports = router;
