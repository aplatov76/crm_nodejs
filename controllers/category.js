const Category = require('../models/Category');
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(req, res, next) {
    
    try{
        const categories = await Category.find({user: req.user.id})

        res.status(200).json(categories)
    } catch (err){
        errorHandler(err)
    }

}

module.exports.getById = async function(req, res, next) {
    const id = req.params.id;   
    try{
        const category = await Category.findById(id)
        //console.log(category)
        res.status(200).json(category)
    } catch (err){
        errorHandler(err)
    }
 
}

module.exports.remove = async function(req, res, next) {
    const id = req.params.id; 

    try{
        await Category.remove({_id: id})
        await Position.remove({category: id})

        res.status(200).json({
            message: 'Категория удалена'
        });
    } catch (err){
        errorHandler(err)
    }

}

module.exports.create = async function(req, res, next) {

    const {name} = req.body;
    const id = req.user.id;

    const category = new Category({
        name: name,
        user: id,
        imageSrc: req.file ? req.file.path : ''
    });

    try{
        await category.save()
        res.status(201).json(category)
    } catch (err){
        errorHandler(err)
    }

}

module.exports.update = async function(req, res, next) {
    const {id} = req.params;
    const update = {
        name: req.body.name
    };
    if(req.file){
        update.imageSrc = req.file.path
    }
    try{

        const category = await Category.findOneAndUpdate({
            _id: id
        },
        {$set: update},
        {new: true})
        res.status(200).json(category)
    } catch (err){
        errorHandler(err)
    }

}