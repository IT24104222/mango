import { useEffect, useState } from "react";
// 1. ADD 'deleteBook' TO YOUR IMPORTS
import { getBooks, deleteBook } from "../api/bookApi.js"; 
import BookCard from "../components/BookCard.jsx";

function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const { data } = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. IMPLEMENTED handleDelete logic
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        // This line removes the book from your screen immediately
        setBooks(books.filter((book) => book._id !== id));
      } catch (error) {
        console.error("Failed to delete book", error);
        alert("Error deleting book");
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <section>
      <div className="hero">
        <h1>Book Details</h1>
        <p>View, manage, edit, and remove books from the library.</p>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : books.length === 0 ? (
        <p>No books available. Add a new book from the menu.</p>
      ) : (
        <div className="grid">
          {books.map((book) => (
            // 3. PASS THE onDelete PROP HERE
            <BookCard 
              key={book._id} 
              book={book} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;