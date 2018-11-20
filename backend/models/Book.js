import mongoose from 'mongoose';
let Book = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    status: {
        type: String,
        default: 'Available'
    }
})

export default mongoose.model('Book', Book);