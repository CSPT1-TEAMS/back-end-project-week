const express = require('express');
const port = process.env.PORT || 5050;

express.get('/', (req, res) => {
    res.json({ Connected : " !=== Connected ===! " })
})
.listen(port, () => {
    console.log(`Listening on ${port}`);
})