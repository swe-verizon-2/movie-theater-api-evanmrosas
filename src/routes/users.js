const express = require("express")
const router = express.Router()
const {User} = require("../../models/index")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// GET all users
router.get("/", async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})


module.exports = router;