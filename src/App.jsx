import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Payment from './components/Payment';
import { UserContext } from './components/UserContext';
import item from './components/item';

const App = () => {
  const [items, setItems] = useState(item);
  const [quantity, setQuantity] = useState(items.map(() => 0));

  return (
    <UserContext.Provider value={{ items, setItems, quantity, setQuantity }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
