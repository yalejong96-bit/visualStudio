import { useEffect, useState } from "react";
import type { Fruit } from "../types/Fruit";
import axios from "axios";
import { API_BASE_URL } from "../config/config";
import { Table } from "react-bootstrap";


function App() {
  const [fruitList, setFruitList] = useState<Fruit[]>([]); //과일 여러개

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_BASE_URL}/fruit/list`;
        const response = await axios.get<Fruit[]>(url);
        setFruitList(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Table hover style={{ margin: '20px' }}>
        <thead>
          <tr>
            <th>아이디</th>
            <th>상품명</th>
            <th>단가</th>
          </tr>
        </thead>
        <tbody>
          {fruitList.map((fruit, idx) =>
            <tr key={fruit.id}>
              <td>{fruit.id}</td>
              <td>{fruit.name}</td>
              <td>{fruit.price.toLocaleString()}</td>
              {setFruitList.length}
            </tr>
          )}
        </tbody>
      </Table >
    </>
  );
}

export default App;