const express = require("express")
const router = express.Router()
const {User, Show} = require("../../models/index")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// GET all users
router.get("/", async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})
// GET one user
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    res.json(user)
})
// POST user
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    if (!emailRegex.test(username)) {
        return res.status(400).json({ error: "Invalid username. Username must be a valid email address." });
    } else{
        const newUser = await User.create({ username, password });
        res.status(200).json(newUser);
    }
})
// GET all the shows watched by one user using an endpoint with a param.
router.get("/:id/shows", async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id, {
        include: {
            model: Show,
            through: { attributes: [] },
        },
    })
    res.json(user.shows);
})
// associate a user with a show they have watched using a PUT endpoint with a param. 
router.put("/:uID/shows/:sID", async (req, res) => {
    const {uID, sID} = req.params
    const user = await User.findByPk(uID)
    const show = await Show.findByPk(sID)

    await user.addShow(show);
    res.json({ message: `User ${uID} is now associated with Show ${sID}` });
})


module.exports = router;