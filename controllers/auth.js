const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys')
const authQueryes = require('../models/auth');
const errorHandler = require('../utils/errorHandler');


module.exports.login = async function(req, res, next){

    const user = req.body;
    //console.log(user)
    authQueryes.findUser(user.email)
        .then((data) => {
            console.log(data)
            const passwordResult = bcryptjs.compareSync(user.password, data.password);
            console.log(passwordResult)
                if(passwordResult){
                    const token = jwt.sign({
                        email: data.email,
                        userId: data.id,
                    }, keys.jwt, {expiresIn: 36000});
                    //console.log('token:', token)
                    res.status(200).json({
                        email: data.email,
                        name: data.name,
                        password: null,
                        token: `Bearer ${token}`
                    }) 

                } else res.status(401).json({
                    "message": "User password incorrect",
                    "err": err
                })
            })
        .catch((err) => {
            res.status(500).json({
                "err": err
            })
        })
}

module.exports.register = function(req, res, next){

    const user = req.body;
    //console.log(req.body)

    authQueryes.findUser(user.email)
        .then((data) => {

            //console.log(!!data.length)
            if(!!data.length)res.json({"message": "User already exists"});
                else {
                    const salt = bcryptjs.genSaltSync(10)
                    const password = bcryptjs.hashSync(user.password, salt);
                        authQueryes.register({...user, password: password})
                            .then(data => res.json({"message": "User registered"}))
                            .catch(err => res.json({
                                "message": "User not registered",
                                "err": err
                            }))
                }


            //return res.json(data)
        })
        .catch((err) => res.send(err).status(500))



    //res.status(200);

    // const candidate = await User.findOne({email: email})

    // if(candidate){
    //     res.status(409).json({
    //         message: 'email занят'
    //     })
    // } else {
    //     const salt = bcryptjs.genSaltSync(10)
    //     const user = new User({
    //         email: email,
    //         password: bcryptjs.hashSync(password, salt)
    //     });
    //     try{
    //         await user.save()
    //             res.status(201).json(user)
    //     } catch(err){
    //          errorHandler(res, err)
    //     }
    // }
    

   // res.status(200).json({register: 'register'})
}