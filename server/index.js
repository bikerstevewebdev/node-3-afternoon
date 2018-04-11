const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const checkSession = require('./middleware/checkForSession')
const auth = require('./controllers/auth_controller')
const sc = require('./controllers/swag_controller')
const cart = require('./controllers/cart_controller')
const search = require('./controllers/search_controller')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 33333333
    }
}))
app.use(checkSession.authenticate)
app.use(express.static(__dirname + '/build'))




// Swag GET Endpoint using swag.read imported as sc.read
app.get('/api/swag', sc.read)

// Auth login
app.post('/api/login', auth.login)
app.post('/api/register', auth.register)
app.post('/api/signout', auth.signout)
app.get('/api/user', auth.getUser)

// Cart Controller endpoints
app.post('/api/cart', cart.add)
app.delete('/api/cart', cart.delete)
app.post('/api/cart/checkout', cart.checkout)


// Search Endpoint
app.get('/api/search', search.search)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on Port ${port} so ya better be ready`)
})