import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Book from './models/Book';

const app = express();
const router = express.Router();

app.use(cors({
    // credentials: true,
}));

// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://localhost:4000/books', true);
// xhr.withCredentials = true;
// xhr.send(null);

app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://abc:admin1@ds024748.mlab.com:24748/books', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/books').get((req, res) => {
    Book.find((err, books) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(books);
        }
    });
});

router.route('/books/:id').get((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(book);
        }
    });
});

router.route('/books/add').post((req, res) => {
    let book = new Book(req.body);
    book.save()
        .then(book => {
            res.status(200).json({ 'book': 'Added successfully' });
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/books/update/:id').post((req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (!book) {
            return next(new Error('Could not load Document'));
        }
        else {
            book.title = req.body.title;
            book.author = req.body.author;
            book.status = req.body.status;

            book.save()
                .then(book => {
                    res.json('Update done');
                })
                .catch(err => {
                    res.status(400).send('Update failed');
                })
        }
    });
});

router.route('/books/delete/:id').get((req, res) => {
    Book.findByIdAndRemove({ _id: req.params.id }, (err, book) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json('Removed successfully');
        }
    })
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));