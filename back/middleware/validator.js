const emailValidator = require("email-validator")
const userSchema = require('../schemas/userSchema')
const postSchema = require('../schemas/postSchema')

module.exports = {
    regValidator: async (req, res, next) => {
        const {email, password, passwordTwo} = req.body

        const findEmail = await userSchema.findOne({email})

        if (findEmail) return res.send({success: false, message: 'Email in use'})

        if (!emailValidator.validate(email)) return res.send({success: false, message: 'Check email please'})
        if (4 > password.length) return res.send({success: false, message: 'Password too short'})
        if (password !== passwordTwo) return res.send({success: false, message: 'Passwords don`t match'})

        next()
    },
    loginValidator: async (req, res, next) => {
        const {email, password} = req.body
        if (email.length === 0) return res.send({success: false, message: 'Enter email'})
        if (password.length === 0) return res.send({success: false, message: 'Enter password'})

        next()
    },
    uploadPostValidator: async (req, res, next) => {
        const {image, name, description, city, price} = req.body

        if (image.length === 0) return res.send({success: false, message: "Add image"})
        if (!image.startsWith('http')) return res.send({success: false, message: "Has to be link"})
        if (name.length === 0 ) return res.send({success: false, message: "Enter name"})
        if (description.length === 0 ) return res.send({success: false, message: "Enter description"})
        if (city.length === 0 ) return res.send({success: false, message: "Enter city"})
        if (price.length === 0 ) return res.send({success: false, message: "Enter price"})

        next()
    }
}