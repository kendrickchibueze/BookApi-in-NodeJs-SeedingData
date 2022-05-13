const express = require('express')
const booksController = require('../controllers/booksController')


function routes(Book){
const bookRouter = express.Router();
const controller = booksController(Book);
bookRouter.route('/books')
.post(controller.post)

.get(controller.get)

//middleware
bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, books)=>{
        if(err){
            return res.send(err)
        }
    if(books){
       req.books = books;
       return next()
     }
        return res.sendStatus(404);
        } );
})


bookRouter.route('/books/:bookId')
.get((req, res) => {
    //takes a query string and creates an object outof it
    //getting a single book
    // const query  ={}
    // if(req.query.genre){
    //     query.genre = req.query.genre
    // }
        res.json(req.books)

    })
    .put((req, res)=>{
        // Book.findById(req.params.bookId, (err, books)=>{
        //     if(err){
        //         return res.send(err)
        //     }
        const{books} = req
            books.title = req.body.title
            books.author= req.body.author
            books.genre = req.body.genre
            books.read = req.body.read
            req.books.save((err)=>{
                if(err){
                  return res.send(err);
            }
                return res.json(books)
                })
    })
    .patch((req, res)=>{
        const{books} = req
          if(req.body._id){
            delete req.body._id;
          }
      Object.entries(req.body).forEach((item)=>{
         const key =  item[0];
         const value = item[1];
         books[key] = value;
    })
    req.books.save((err)=>{
    if(err){
      return res.send(err);
}
    return res.json(books)
    })
      })
.delete((req, res)=>{
     req.books.remove((err)=>{
        if(err){
        return res.send(err);
        }
        res.sendStatus(204);
            })
        })

    return bookRouter;
}


module.exports  = routes;