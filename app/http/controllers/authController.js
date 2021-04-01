const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    return {
        login(req, res) {
            res.render('auth/login')

        },
        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                }

                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req, res, next)

        },


        register(req, res) {
            res.render('auth/register')

        },
        async postRegister(req, res) {
            const {
                name,
                email,
                password
            } = req.body
            //validate request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            //check if email exists
            User.exists({
                email: email
            }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already taken')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            //Hash password
            //await can't be used simply the function should be async
            // parent function should be async
            const hashedPassword = await bcrypt.hash(password, 10)


            //create a user using model
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword //simple password shouldn't be stored as it's about security
            })

            user.save().then((user) => {
                //later after registration we will put into login form 

                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })


        },
        logout(req, res) {
            req.logout()
            return res.redirect('/login')
        }

    }
}


module.exports = authController