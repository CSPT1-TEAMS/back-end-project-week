const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const server = require('./server')

mongoose
    .connect('mongodb://caroline:lambda1@ds141611.mlab.com:41611/backend-week', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to mongo on AWS')
        server.listen(PORT, () => {
            console.log(`Listening on ${PORT}`)
        })
    })
    .catch(err => {
        console.log(err);
    })