import './App.scss';
import { useState, useEffect } from 'react';
import {
  Route, Routes, useNavigate,
} from 'react-router-dom';

import Counter from '../Counter/Counter';
import Modal from '../Modal/Modal';
import Quiz from '../Quiz/Quiz';
import Users from '../Users/Users';
import Convertor from '../Converter/Convertor';

function App() {
  return (
    <div className="page">
      <Routes>
          <Route path="/counter" element={<Counter/>} />
          <Route path="/modal" element={<Modal/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/convertor" element={<Convertor/>} />
      </Routes>
    </div>
  );
}

export default App;
