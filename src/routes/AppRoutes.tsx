import { Route, Routes } from "react-router-dom";

import FruitOne from './../pages/FruitOne';
import FruitList from './../pages/FruitList';
import HomePage from "../pages/HomePage";




function App() {
  return (
    <Routes>
      <Route path="/fruit" element={<FruitOne />} />
      <Route path="/fruit/list" element={<FruitList />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}

export default App;