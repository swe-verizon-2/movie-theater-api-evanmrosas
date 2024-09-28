const express = require("express")
const router = express.Router()
const {Show, User} = require("../../models/index")

router.use(express.json())
router.use(express.urlencoded({extended: true}))

// POST show
router.post("/", async (req, res) => {
    const { title, genre, available } = req.body
    if (title.length > 25) {
        return res.status(400).json({ error: "Title cannot be longer than 25 characters." });
    } else{
        const newShow = await Show.create({ title, genre, available });
        res.status(200).json(newShow);
    }
})
// GET all shows
router.get("/", async (req, res) => {
    const shows = await Show.findAll()
    res.json(shows)
})
// GET one show
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const show = await Show.findByPk(id)
    res.json(show)
})
// GET all the users who have watched a show using an endpoint with a param. 
router.get("/:id/users", async (req, res) => {
    const id = req.params.id
    const show = await Show.findByPk(id, {
        include: {
            model: User,
            through: { attributes: [] },
        },
    })
    res.json(show.users);
})
// update the available property of a show using a PUT endpoint with a param. 
router.put("/:id/available", async (req, res) => {
    const id = req.params.id
    const show = await Show.findByPk(id)
    show.available = !show.available;
    await show.save();
})
//GET a show of a particular genre using an endpoint with a query. 
router.get("/:genre", async (req, res) => {
    const genre = req.params.genre
    const shows = await Show.findAll({where: {genre: genre}})
    res.json(shows)
})
// DELETE one show
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleteShow = await Show.findByPk(id)
    await deleteShow.destroy()
    res.status(200).json({message: "show deleted"})
})


module.exports = router;