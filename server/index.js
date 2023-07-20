import express, { json } from 'express'
const app = express();
app.use(express.json());



import mysql from 'mysql'

// cors avoid to the restriction, to use the mysql data base in node js 
import cors from 'cors'
app.use(cors());


// Creating database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql1234",
  database: "bookshop"

})


// root directory of the server
app.get("/", (req, res) => {
  res.json("Hello backend is here")
})



// Display all books from the database
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books"
  db.query(q, (data, err) => {
    if (err) {
      return res.json(err)
    }
    return res.json(data)
  })
})



// Add new book into the book database table
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?) "
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,

  ]
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.json("Book has been added successfully")
  })
})


// Deleting a book with id reference 
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id  = ?"
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err)
    return res.json("Book deleted")
  })
})


// Updating a book with id reference
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


// Listening at the port number 8181 of books store database
app.listen(8181, () => {
  console.log("Backend connected")
})