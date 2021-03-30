//factory function -- that returns object

//fetch menu model
const Menu = require('../../models/menu')

function homeController() {
    return { //await will only when function is async
        async index(req, res) {

            const pizzas = await Menu.find()
            console.log(pizzas)
            return res.render('home', {
                pizzas: pizzas
            })


            // Menu.find().then(function (pizzas) {
            //     console.log(pizzas)
            //     return res.render('home', {
            //         pizzas: pizzas
            // })
            // })



        } //CURD controller-- create update read delete
    }
}


module.exports = homeController