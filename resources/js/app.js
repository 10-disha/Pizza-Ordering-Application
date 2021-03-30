import axios from 'axios'

let addToCart = document.querySelectorAll('.add-to-cart')

function updateCart(pizza) {

}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updatCart(pizza)
    })
})



//object to string using json string