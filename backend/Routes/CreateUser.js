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
