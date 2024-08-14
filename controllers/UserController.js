const { User } = require('../models')

class UserController {

  static renderRegister(req, res) {
    res.render('register')
  }

  static async handleRegister(req, res) {
    try {
      const { username, email, password } = req.body
      await User.create({ username, email, password })

      res.redirect('/register')
      
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    
  }

}

module.exports = UserController