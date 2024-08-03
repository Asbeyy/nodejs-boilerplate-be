const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },

    

    user: {
        name: {
            type: String,
            default: ""
        },
        surname: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            enum: ['user', 'author', 'publisher', 'admin'],
            default: 'user'
        },
        owned_stories: {
            type: Array,
            default: []
        },
        pubblished_stories: {
            type: Array,
            default: []
        },
    },
    finances: {
        payment_stripe_customer_id: { 
            type: String, default: "" 
        },
        history: {
            type: Array,
            default: []
        },
    },
    booleans: {
        isVerified: {
            type: Boolean,
            default: true
        },
        isPremium: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    tokens: {
        verificationToken: {
            type: String
        },
        passwordResetToken: {
            type: String
        },
    }

})

module.exports = mongoose.model('Account', accountSchema)