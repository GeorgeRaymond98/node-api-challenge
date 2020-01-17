const express = require('express')
const cors = require('cors')

const server = express()

const projectRouter = require("./api/projectRouter")
const actionRouter = require("./api/actionRouter")

server.use(express.json())

server.use(logger)


server.use("/api/projects", projectRouter)
server.use("/api/actions", actionRouter)

server.get('/', (req, res) => {
    res.status(200).json({its: "working"})
})

function logger(req, res, next) {
    console.log(`req: ${req.method} '${req.url}'`)
    next()
}

module.exports = server