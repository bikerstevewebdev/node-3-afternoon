const swag = require('../models/swag')

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query
        console.log(`query id: ${id}`)
        let item = req.session.user.cart.find(v => v.id == id)
        if(item) {
            res.status(200).send(req.session.user)
        } else {
            let newItem = swag.find(v => {return v.id == id})
            console.log(`newItem: ${newItem}`)
            req.session.user.cart.push(newItem)
            req.session.user.total += newItem.price
            res.status(200).send(req.session.user)
        }
    },

    delete: (req, res, next) => {
        const { id } = req.query
        const { session } = req
        let remItem = session.user.cart.find(v => v.id == id)
        let index
        session.user.cart.forEach((v, i) => {
            index = v.id === id ? i : index
        })
        session.user.total -= remItem.price
        session.user.cart.splice(index, 1)
        res.status(200).send(session.user)
    },

    checkout: (req, res, next) => {
        const { user } = req.session
        user.cart = []
        user.total = 0
        res.status(200).send(user)
    }
}