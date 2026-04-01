import { Route, Routes } from "react-router-dom";

import FruitOne from './../pages/FruitOne';
import FruitList from './../pages/FruitList';

function App(){
  return(
    <Routes>
        <Route path="/fruit" element={<FruitOne />} />
        <Route path="/fruit/list" element={<FruitList />} />
    </Routes>
  );
}

export default App;