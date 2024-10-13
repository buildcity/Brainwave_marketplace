import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [item, setItem] = useState(null);
  const [itemId, setItemId] = useState('');
  const [query, setQuery] = useState('');

  // Fetch the root message from the FastAPI backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching the message!", error);
      });
  }, []);

  // Fetch item data by itemId
  const fetchItem = () => {
    const url = query
      ? `http://127.0.0.1:8000/items/${itemId}?q=${query}`
      : `http://127.0.0.1:8000/items/${itemId}`;

    axios.get(url)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the item!", error);
      });
  };

  return (
    <div className="App">
      <h1>FastAPI Frontend Testing</h1>

      <div>
        <h2>Message from FastAPI:</h2>
        <p>{message}</p>
      </div>

      <div>
        <h2>Fetch Item</h2>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          placeholder="Enter item ID"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Optional query"
        />
        <button onClick={fetchItem}>Fetch Item</button>

        {item && (
          <div>
            <h3>Item Data:</h3>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;