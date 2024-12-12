import React, { useState } from 'react';
import './App.css';
import BookList from './components/BookList';
import BookCheckout from './components/BookCheckout';
import BookCheckin from './components/BookCheckin';
import Navbar from './components/Navbar';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleBookUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Available Books</h2>
            <BookList type="available" refreshTrigger={refreshTrigger} />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Checked-Out Books</h2>
            <BookList type="checked-out" refreshTrigger={refreshTrigger} />
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <section>
              <BookCheckout onSuccess={handleBookUpdate} />
            </section>

            <section>
              <BookCheckin onSuccess={handleBookUpdate} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;