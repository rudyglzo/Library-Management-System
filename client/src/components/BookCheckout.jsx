import React, { useState } from 'react';
import { checkoutBook } from '../services/api';

const BookCheckout = ({ onSuccess }) => {
    const [isbn, setIsbn] = useState('');
    const [checkedOutBy, setCheckedOutBy] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
  
    const handleCheckout = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage(null);
      
      try {
        const result = await checkoutBook(isbn, checkedOutBy, dueDate);
        setMessage({ type: 'success', text: `Successfully checked out: ${result.title}` });
        setIsbn('');
        setCheckedOutBy('');
        setDueDate('');
        onSuccess();
    } catch (error) {
        setMessage({ 
            type: 'error', 
            text: error.response?.data || 'Error checking out the book.'
        });
    } finally {
        setLoading(false);
    }
};
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Check Out a Book</h2>
        <form onSubmit={handleCheckout} className="space-y-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Checked Out By</label>
            <input
              type="text"
              value={checkedOutBy}
              onChange={(e) => setCheckedOutBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
            {loading ? 'Processing...' : 'Check Out Book'}
          </button>
        </form>
      </div>
    );
  };

export default BookCheckout;