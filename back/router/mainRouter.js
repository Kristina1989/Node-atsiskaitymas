const express = require('express')
const router = express.Router()
const {loggedIn, register, login, getPosts, uploadPost, getBookings, getPostCard, search, hotelBooking, logout} = require('../controllers/mainController')
const {regValidator, loginValidator, uploadPostValidator} =require('../middleware/validator')

router.get('/loggedIn', loggedIn)
router.post('/register', regValidator, register)
router.post('/login', loginValidator, login)
router.get('/allPosts', getPosts)
router.post('/upload', uploadPostValidator, uploadPost)
router.get('/myBookings', getBookings)
router.get('/singlePostCard/:_id', getPostCard)
router.post('/filter', search)
router.post('/bookHotel', hotelBooking)
router.get('/logout', logout)

module.exports = router