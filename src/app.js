const express = require("express")
const app = express()

const userRoute = require("./routes/users")
const showRoute = require("./routes/shows")

app.use("/users", userRoute)
app.use("/users/:id", userRoute)

app.use("/shows", showRoute)
app.use("/shows/:id", showRoute)


module.exports = app;