// const express = require('express')
// const router = express.Router();
// const Order = require('../models/Order')

// router.post('/orderData', async (req, res) => {
//     let data = req.body.order_data
//     await data.splice(0, 0, { Order_date: req.body.order_data });
//     let eID = await Order.findOne({ 'email': req.body.email })
//     console.log(eID)
//     if (eID === null) {
//         try {
//             await Order.create({
//                 email: req.body.email,
//                 order_data: [data]
//             }).then(() => {
//                 res.json({ success: true })
//             })
//         } catch (error) {
//             console.log(error.message)
//             res.send("server error", error.message)
//         }
//     }
//     else {
//         try {
//             await Order.findByIdAndUpdate({ email: req.body.email },
//                 {$push:{ order_data:data}}).then(()=>{
//                     res.json({success:true})
//                 })
//         }
//         catch(error){
//             res.send("server error",error.message)
//         }
//     }
// })

// module.exports = router;


const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).json({ success: false, error: "Email is required" });
        }

        let data = req.body.order_data;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ success: false, error: "Invalid order data" });
        }
        data.unshift({ Order_date: new Date() });

        let existingOrder = await Order.findOne({ email: req.body.email });

        if (!existingOrder) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
            return res.json({ success: true });
        } else {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            return res.json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
});

router.post('/myorderData', async (req, res) => {
    try{
        let myData = await Order.findOne({'email':req.body.email})
        res.json({orderData:myData})
    }catch(error){
        res.send("server error",error.message)
    }
})
module.exports = router;
