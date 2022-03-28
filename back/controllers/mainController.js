const userSchema = require('../schemas/userSchema')
const postSchema = require('../schemas/postSchema')
const bcrypt = require("bcrypt")

module.exports = {
    loggedIn: async (req, res) => {
        const {checked} = req.session

        if (checked) return res.send({success: true})
        res.send({success: false})
    },
    register: async (req, res) => {
        const {email, admin, password} = req.body
        const hash = await bcrypt.hash(password, 10)
        const user = await new userSchema({
            email,
            admin,
            password: hash
        })
        await user.save()

        res.send({success: true})
    },
    login: async (req, res) => {
        const {email, password, checked} = req.body
        const findUser = await userSchema.findOne({email})
        if (findUser) {
            const compareResult = await bcrypt.compare(password, findUser.password)
            if (compareResult) {
                req.session.email = email
                req.session.checked = checked
                if (findUser.admin) return res.send({success: true, admin: true})
                return res.send({success: true})
            }
        }
        res.send({success: false, message: 'Bad credentials'})
    },
    getPosts: async (req, res) => {
        const {email} = req.session
        if (email) {
            const posts = await postSchema.find({})
            return res.send({success: true, posts})
        }
        res.send({success: false})
    },
    uploadPost: async (req, res) => {
        const {image, name, description, city, price} = req.body
        const {email} = req.session
        if (email) {
            const post = new postSchema({
                image,
                name,
                description,
                city,
                price: Number(price)
            })
            await post.save()
            return res.send({success: true})
        }

        res.send({success: false, message: "Not logged in"})
    },
    getPostCard: async (req, res) => {
        const {email} = req.session
        const {_id} = req.params
        if (email) {
            const post = await postSchema.findOne({_id})
            return res.send({success: true, post})
        }
        res.send({success: false, message: "Not logged in"})
    },
    getBookings: async (req, res) => {
        const {email} = req.session

        if (email) {
            const user = await userSchema.findOne({email})
            return res.send({success: true, bookings: user.bookings})
        }
        res.send({success: false, message: "Not logged in"})
    },
    search: async (req, res) => {
        const {city, priceFrom, priceTo} = req.body
        const {email} = req.session

        if (email) {
            const posts = await postSchema.find({})

            const filtered = posts.filter(x => city !== "" ? x.city.toLowerCase() === city.toLowerCase() : x)
            const filtered2 = filtered.filter(x => priceFrom !== "" ? x.price >= priceFrom : x)
            const filtered3 = filtered2.filter(x => priceTo !== "" ? x.price <= priceTo : x)
            return res.send({success: true, posts: filtered3})
        }
        res.send({success: false, message: "Not logged in"})
    },
    hotelBooking: async (req, res) => {
        const booking = req.body
        const {email} = req.session

        if (email) {
            await userSchema.findOneAndUpdate({email}, {$push: {bookings: {...booking}}})
            const user = await userSchema.findOne({email})
            return res.send({success: true, bookings: user.bookings})
        }
        res.send({success: false, message: "Not logged in"})
    },
    logout: async (req, res) => {
        req.session.email = null
        req.session.checked = null
        res.send({success: true})
    }
}

