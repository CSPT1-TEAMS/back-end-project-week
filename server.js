const express = require('express');
const port = process.env.PORT || 5000;

express.get('/', (req, res) => {
    res.json({ Connected : " !=== Connected ===! " })
})
.listen(port, () => {
    console.log(`Listening on ${port}`)
})