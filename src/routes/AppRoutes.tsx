import { Route, Routes } from "react-router-dom";

import FruitOne from './../pages/FruitOne';
import FruitList from './../pages/FruitList';
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/fruit" element={<FruitOne />} />
      <Route path="/fruit/list" element={<FruitList />} />
      <Route path='/' element={<HomePage />} />
      
      <Route path='/member/signup' element={<SignupPage />} />
    </Routes>
  );
}

export default App;