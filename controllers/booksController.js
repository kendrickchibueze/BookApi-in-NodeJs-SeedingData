
//we use the module reveal pattern here
function booksController(Book){
function post(req, res){
    //mongoose will create that new book for us
const book = new Book(req.body)

if(!req.book.title){

}


book.save()
res.status(201)
return res.json(book)
}
function get(req, res) {
    //takes a query string and creates an object outof it
    //searching by genre
    const query  ={}
    if(req.query.genre){
        query.genre = req.query.genre
    }
        Book.find(query, (err, books)=>{
            if(err){
                return res.send(err)
            }
            return res.json(books);
    } );
    }
return{ post, get };
}

module.exports = booksController