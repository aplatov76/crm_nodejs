const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res, next) {
    try{

    } catch(err){
        errorHandler(res, error)
    }
}

module.exports.getByCategoryId = async function(req, res, next) {

    const {categoryId} = req.params;
    const {id} = req.user;

    try{
        const positions = await Position.find({
            category: categoryId,
            user: id
        });
        res.status(200).json(positions)
    } catch(err){
        errorHandler(res, error)
    }
}

module.exports.remove = async function(req, res, next) {
    const id = req.params.id;
    try{
        await Position.remove({_id: id})

        res.status(200).json({
            message: 'Позиция удалена'
        })
    } catch(error){
        errorHandler(res, error)
    }
}

module.exports.create = async function(req, res, next) {

    const {name, cost, type = 0, category} = req.body;
    console.log(name)
    console.log(cost)
    console.log(type)
    console.log(category)

    try{
        const position = await new Position({
            name : name,
            cost: cost,
            type: type,
            category: category,
            user: req.user.id
        }).save();

        res.status(201).json(position)
    } catch(error){
        errorHandler(res, error)
    }
}

module.exports.update = async function(req, res, next) {
    //const {name, cost, type, category} = req.body;
    const id = req.params.id;
    try{

        const position = await Position.findOneAndUpdate(
            {_id: id},
            {
                $set: req.body
            },
            {new: true}
            );

        res.status(200).json(position)
    } catch(error){
        errorHandler(res, error)
    }
}
