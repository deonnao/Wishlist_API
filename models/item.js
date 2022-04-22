const mongoose = require('mongoose')


const wishlistSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },

    goal: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    url: {
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Wishlist', wishlistSchema)