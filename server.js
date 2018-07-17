const express = require('express')
const server = express()
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

server.get("/", (req, res) => {
    return res.status(200).json({hello: 'world'})
})
