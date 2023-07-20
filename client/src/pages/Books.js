import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
  const [books, setBooks] = useState([])
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8181/books")
        setBooks(res.data)

      }
      catch (err) {
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8181/books/" + id)
      window.location.reload()
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            <img src={book.cover} alt="" />
            <h2>{book.title}</h2>
            <p className='bookDesc'>{book.desc}</p>
            <span>₹ {book.price} </span>
            <button className="update">
              <Link className='link' to={`/update/${book.id}`}>Update</Link>
            </button>

            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>

  )
}

export default Books