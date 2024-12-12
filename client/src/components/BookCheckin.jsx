import React, { useState } from 'react';
import { checkinBook } from '../services/api';

const BookCheckin = ({ onSuccess }) => {
    const [isbn, setIsbn] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
  
    const handleCheckin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage(null);
  
      try {
          const result = await checkinBook(isbn);
          setMessage({ type: 'success', text: `Successfully checked in: ${result.title}` });
          setIsbn('');
          onSuccess();
      } catch (error) {
          setMessage({ 
              type: 'error', 
              text: error.response?.data || 'Error checking in the book.'
          });
      } finally {
          setLoading(false);
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Check In a Book</h2>
        <form onSubmit={handleCheckin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {message && (
            <div className={`p-3 rounded-md ${
              message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message.text}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Check In Book'}
          </button>
        </form>
      </div>
    );
  };

export default BookCheckin;