const moment = require('moment')
const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler')

module.exports.overview = async function(req, res, next){
    //console.log('helllo overview')
    const userid = req.user.id;

    try {

        const allOrders = await Order.find({user: userid})
            .sort({date: 1})
        //console.log(allOrders)
        const ordersMap = getOrdersMap(allOrders);    
        //console.log(ordersMap)
        const totalOrderNumbers = allOrders.length;
        // Количество дней
        const totalDays = Object.keys(ordersMap).length;
        // Заказы вчера
        const yesterdayOrders = ordersMap[moment().format('DD.MM.YYYY')] || []
        // Число заказов вчера
        const yesterdayOrdersLength = yesterdayOrders.length;

        // Среднее значение заказов в день
        const ordersMiddleDays = (totalOrderNumbers/ totalDays).toFixed(0);
        //  Процент для количества заказов
        // ((заказов вчера / кол-во заказов в день(среднее)) - 1) * 100%
        const ordersPercent = (((yesterdayOrdersLength / ordersMiddleDays) - 1) * 100).toFixed(2)

        // Общая выручка
        const totalGain = calculatePrice(allOrders)

        // Выручка в день
        const gainPerDay = (totalGain / totalDays).toFixed(0);
        // Выручка за вчера
        const yesterdayGain = calculatePrice(yesterdayOrders)
        // Процент выручки
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);
        // Cравнение выручки за вчера и средней выручки за день
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2)
        // Cравнение количества заказов
        const compareNumber = (yesterdayOrdersLength  - ordersMiddleDays).toFixed(2);
        //const 

        res.status(200).json({
            gain: {
                percent:  Math.abs(+gainPercent),
                compare:  Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                middle: gainPerDay,
                isHigher: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersLength,
                middle: ordersMiddleDays,
                isHigher: +compareNumber > 0
            }

        })
    } catch(err) {
        errorHandler(res, err)
    }
}

function getOrdersMap(orders = []){
    const daysOrders = {}

    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')
        // if(date === moment().format('DD.MM.YYYY')){
        //     return
        // }
        if(!daysOrders[date]){
            daysOrders[date] = []
        }

        daysOrders[date].push(order)
    })

    return daysOrders
}

function calculatePrice(allOrders = []){
   // let total = 0
   // allorders.map(order => order.list.forEach(el => total = total + el.quantity*el.price))

   return allOrders.reduce((total, order) => {
       return total += order.list.reduce((total, order) => total +=order.cost*order.quantity, 0)
   } , 0)
}

module.exports.analytics = async function(req, res, next){

    const id = req.user.id;
    try {
        
        const allOrders = await Order.find({user: id}).sort({date: 1})
        const ordersMap = getOrdersMap(allOrders);

        const average = calculatePrice(allOrders);
        const daysNumber = Object.keys(ordersMap).length;

        const middlePay = +(average/daysNumber).toFixed(2);

        const chart = Object.keys(ordersMap).map(label => {

            const gain = calculatePrice(ordersMap[label]);
            const order = ordersMap[label].length;
            return {
                label, gain, order
            }
        })


        res.status(200).json({
            middlePay: middlePay,
            chart
        })

    } catch(err){
        errorHandler(res, err)
    }

}