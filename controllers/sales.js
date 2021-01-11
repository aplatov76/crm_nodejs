const salesQueryes = require('../models/sales');
const errorHandler = require('../utils/errorHandler')

// get localhost:5000/api/order?offset=2&limit=5
module.exports.getToday = async function(req, res, next) {

    salesQueryes.getToDay()
    .then((data) => {
        //console.log(data)
        res.json(data)
    })
    .catch((err) => {
        res.status(401).json({
            "err": err
        })
    })

}

module.exports.getById = async function(req, res, next) {
    try{

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


    salesQueryes.addSale(req.body)
    .then((data) => {
        //console.log(data)
        res.json(data)
    })
    .catch((err) => {
        res.status(401).json({
            "err": err
        })
    })

}

module.exports.update = async function(req, res, next) {
    try{

    } catch(err) {
        errorHandler(res, err)
    }
}
