
const User = require('../model/usermodel')
const errorHandler = require('../utils/error.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const existingUserName = await User.findOne({ username: username })

        if (existingUserName !== null) {
            next(errorHandler(401, `Cannot use this username, username ${newUser.username} is used `))   
        }

        await newUser.save();
        res.status(201).json('User created successfully!');
    } catch (error) {
        next(error);
    }
}


const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'))

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!!!'))

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        // Log the token to the console
        console.log('JWT Token:', token);

        const { password, ...rest } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(...rest);
    } catch (error) {
        next(error);
    }
};


module.exports = { signin, signup }