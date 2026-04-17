import { Route, Routes } from "react-router-dom";

import FruitOne from './../pages/FruitOne';
import FruitList from './../pages/FruitList';
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import type { User } from "../types/User";
import ProductList from './../pages/ProductList';
import ProductInsertForm from './../pages/ProductInsertForm';
import ProductUpdateForm from './../pages/ProductUpdateForm';
import ProductDetail from './../pages/ProductDetail';
import CartList from './../pages/CartList';
import OrderList from '../pages/OrderList';

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

      <Route path="/product/list" element={<ProductList user={user} />} />

      <Route path='/product/insert' element={<ProductInsertForm user={user} />} />

      <Route path='/product/update/:id' element={<ProductUpdateForm user={user} />} />

      <Route path='/product/detail/:id' element={<ProductDetail user={user} />} />

      <Route path='/cart/list' element={<CartList user={user} />} />
      
      <Route path='/order/list/' element={<OrderList user={user} />} />
    </Routes>
  );
}

export default App;