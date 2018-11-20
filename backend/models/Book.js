import mongoose from 'mongoose';
var id = mongoose.Schema.ObjectId;
console.log(id);
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