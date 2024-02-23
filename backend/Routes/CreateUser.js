// const express = require('express')
// const router = express.Router()
// const User = require("../models/User.js")
// const { body, validationResult } = require('express-validator');
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
// const jwtSecret = "MynameisEndtoEndYouTubeChannel$#"
// router.post("/createuser", [
//     body('email').isEmail(),
//     body('name').isLength({ min: 5 }),
//     body('password').isLength({ min: 5 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     //const salt = await bcrypt.genSalt(10);
//     const secPassword = bcrypt.hash(req.body.password, 10, function(err, hash) {
//         if (err) { throw (err); }
    
//         bcrypt.compare(req.body.password, hash, function(err, result) {
//             if (err) { throw (err); }
//             console.log(result);
//         });
//     });
//     //let secPassword = await bcrypt.hash(, 10)
//     try {
//         await User.create({
//             name: req.body.name,
//             password: secPassword,
//             email: req.body.email,
//             location: req.body.location
//         }).then(res.json({ success: true }))
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false });
//     }
// })

// router.post("/loginuser", [
//     body('email').isEmail(),
//     body('password').isLength({ min: 5 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     let email = req.body.email;
//     try {
//         let userData = await User.findOne({ email })
//         if (!userData) {
//             return res.status(400).json({ errors: "Try logging with correct email" })
//         }
        
//         const salt1 = await bcrypt.genSalt(10);
//         const checkpassword = await bcrypt.hash(userData.password, salt1)
//         const passcompare = await bcrypt.compare(checkpassword, userData.password)
//         console.log(checkpassword);
//         console.log(userData.password);
//         // if (req.body.password !== userData.password) {
//         //     return res.status(400).json({ errors: "Wrong password" })
//         // }
//         if (!passcompare) {
//            return res.status(400).json({ errors: "Wrong password" })
//         }

//         const data = {
//             user: {
//                 id: userData.id
//             }
//         }
//         const authToken = jwt.sign(data, jwtSecret)
//         return res.json({ success: true, authToken: authToken })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false });
//     }
// })

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const User = require("../models/User.js");
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const jwtSecret = "DSNAFQEFJNSKDSAPOJFNMDASS<DS"
// router.post("/createuser", [
//     body('email').isEmail(),
//     body('name').isLength({ min: 5 }),
//     body('password').isLength({ min: 5 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//     }
//     // const salt = await bcrypt.genSalt(10);
//     // let secPassword = await bcrypt.hash(req.body.password,salt)
//     try {
//         await User.create({
//             name: req.body.name,
//             password: req.body.password,
//             email: req.body.email,
//             location: req.body.location
//         });
//         res.json({ success: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, error: "Server Error" });
//     }
// });

// router.post("/loginuser", [
//     body('email').isEmail(),
//     body('password').isLength({ min: 5 }),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ success: false, errors: errors.array() });
//     }
//     const { email, password } = req.body;
//     try {
//         const userData = await User.findOne({ email });
//         if (!userData) {
//             return res.status(400).json({ success: false, errors: "User not found" });
//         }

//         if (req.body.password !==userData.password) {
//             return res.status(400).json({ errors: "Wrong password" })
//         }

//         const data = {
//             user: {
//                 id: userData.id
//             }
//         }
//         return res.json({ success: true })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, error: "Server Error" });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "DSNAFQEFJNSKDSAPOJFNMDASS<DS";

router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, name, password, location } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            name: name,
            password: hashedPassword,
            email: email,
            location: location
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ success: false, errors: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, userData.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, errors: "Wrong password" });
        }

        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

module.exports = router;
