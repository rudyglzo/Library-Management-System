import React, { useEffect, useState } from 'react';
import { fetchAvailableBooks, fetchCheckedOutBooks } from '../services/api';

function BookList({ type, refreshTrigger }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const data = type === 'available'
          ? await fetchAvailableBooks()
          : await fetchCheckedOutBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [type, refreshTrigger]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <div key={book._id} className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-medium text-gray-800">{book.title}</h3>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
        </div>
      ))}
      {books.length === 0 && (
        <div className="text-gray-600">No books found</div>
      )}
    </div>
  );
}

export default BookList;