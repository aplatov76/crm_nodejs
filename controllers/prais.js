const praisQueryes = require('../models/prais');
const errorHandler = require('../utils/errorHandler');


function buildTree (controllers) {
    // Складываем все элементы будущего дерева в мап под id-ключами
    // Так легче делать поиск родительской ноды
    const map = new Map(controllers.map(item => [item.id, item]));
    //console.log(map.values());
    // Обход в цикле по значениям, хранящимся в мапе
    for (let item of map.values()) {
      
      // Проверка, является ли нода дочерней (при parent === null вернет undefined)
      if (!map.has(item.parent)) {
        continue;
      }
      
      // Сохраняем прямую ссылку на родительскую ноду, чтобы дважды не доставать из мапа
      const parent = map.get(item.parent);
  
      // Добавляем поточную ноду в список дочерних нод родительчкого узла.
      // Здесь сокращено записана проверка на то, есть ли у ноды свойство children.
      parent.children = [...parent.children || [], item];
      //console.log(parent)

    }
  
    // Возвращаем верхний уровень дерева. Все дочерние узлы уже есть в нужных родительских нодах
    return [...map.values()].filter(item => !item.parent);
  }



module.exports.getPrais = async function(req, res, next) {

    praisQueryes.getPrais()
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

module.exports.getAllProducts = async function(req, res, next) {

    praisQueryes.getAllProducts()
    .then((data) => {
        //console.log(data)
        res.json(buildTree(data))
        //res.json(data)
    })
    .catch((err) => {
        res.status(401).json({
            "err": err
        })
    })

}

module.exports.getById = async function(req, res, next) {

    const id = req.body;

    praisQueryes.getById(id)
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

module.exports.remove = async function(req, res, next) {
    const id = req.body;

    praisQueryes.removeById(id)
        .then((data) => {
            res.json(data)

        })
        .catch((err) => {
            res.status(401).json({
                "err": err
            })
        })
}

module.exports.save = async function(req, res, next) {

    const product = req.body.product;

    praisQueryes.saveProduct(product)
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

module.exports.getGroups = async function(req, res, next) {
    praisQueryes.getGroups()
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
