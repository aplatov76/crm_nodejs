const express = require('express');
const authRoutes = require('./routes/auth');
//const analyticsRoutes = require('./routes/analytics');
//const categoryRoutes = require('./routes/category');
//const positionRoutes = require('./routes/position');
const salesRoutes = require('./routes/sales');
const prais = require('./routes/prais');
const orders = require('./routes/orders');
//const keys = require('./config/keys');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
//const mongoose = require('mongoose');
const passport = require('passport');


// mongoose.connect(keys.mongoURI)
//     .then(() => console.log('mongoose connect'))
//     .catch(err => console.log(err))

// const pull = mysql.createPool ({
//     ...keys
// });

// db.connect(
//     () => {
//         console.log('mysql db connect')
//     },
//     (err) => {
//     if (err)throw err;
    
//     //console.log('Connected to database');
//     }
// );
//global.pull = pull;

const app = express();

app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes)
//app.use('/api/analytics', analyticsRoutes)
//app.use('/api/category', categoryRoutes)
//app.use('/api/position', positionRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/prais', prais)
app.use('/api/orders', orders)

module.exports = app