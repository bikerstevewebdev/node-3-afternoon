const swag = require('../models/swag')

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query
        if(!category){
            res.status(200).send(swag)
        } else{
            let filtered = swag.filter(v => v.category.includes(category))
            res.status(200).send(filtered)
        }
    }
}