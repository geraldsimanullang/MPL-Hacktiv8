const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
const router = require('./routers')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'you know when you know it',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}));

app.use(router)

app.listen(port, () => {
  console.log('Connected to port', port)
})