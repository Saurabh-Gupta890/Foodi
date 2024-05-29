const mongoose = require('mongoose');
const { Schema } = mongoose;
const paymentSchema = new Schema ({
    email: String,
    quantity: Number,
    itemsName: Array,
    cartItems: Array,
    menuItems: Array,
    price: Number, 
    status: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;