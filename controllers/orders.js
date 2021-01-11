const ordersQueryes = require('../models/orders');
const errorHandler = require('../utils/errorHandler')

// get localhost:5000/api/order?offset=2&limit=5
module.exports.getAll = async function(req, res, next) {

    ordersQueryes.getAll()
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(401).json({
                "err": err
            })
        })

}

module.exports.getById = async function(req, res, next) {

    //console.log(req.body)

    const {id} = req.body;
    try{

        ordersQueryes.getId(id)
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(401).json({
                    "err": err
                })
            })

    } catch(err) {
        errorHandler(res, err)
    }
}

module.exports.remove = async function(req, res, next) {
    try{

    } catch(err) {
        errorHandler(res, err)
    }
}

module.exports.add = async function(req, res, next) {


    ordersQueryes.addOrder(req.body)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(401).json({
            "err": err
        })
    })

}