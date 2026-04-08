import { Route, Routes } from "react-router-dom";

import FruitOne from './../pages/FruitOne';
import FruitList from './../pages/FruitList';
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import type { User } from "../types/User";
import ProductList from './../pages/ProductList';

interface AppProps {
  user: User | null;
  handleLoginSuccess: (userData: User) => void;
}

function App({ user, handleLoginSuccess }: AppProps) {
  return (
    <Routes>
      <Route path="/fruit" element={<FruitOne />} />
      <Route path="/fruit/list" element={<FruitList />} />
      <Route path='/' element={<HomePage />} />

      <Route path='/member/signup' element={<SignupPage />} />
      <Route path='/member/login' element={<LoginPage onLogin={handleLoginSuccess} />} />

      <Route path="/product/list" element={<ProductList />} />
    </Routes>
  );
}

export default App;