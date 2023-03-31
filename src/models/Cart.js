const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    userId : {
        type: ObjectID,
        required: true,
        ref: 'User'
    },
    products: [{
        productId: {
            type: String,
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        }
    }],
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart