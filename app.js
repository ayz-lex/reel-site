const express = require('express')
const app = express()

app.use('/', require('./routes/register'))

app.set('view engine', 'ejs')

app.listen(3000, () => {console.log('currently listening to port 3000')})

