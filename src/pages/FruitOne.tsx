import { useEffect, useState } from "react";
import type { Fruit } from "../types/Fruit";
import { API_BASE_URL } from "../config/config";
import axios from "axios";
import { Table } from "react-bootstrap";


function App() {
    const [fruit, setFruit] = useState<Fruit | null>(null); // 넘겨 받은 과일 1개

    useEffect(() => { // Backedn 서버에서 데이터 받아 오기
        const fetchResult = async () => {
            try {
                const url = `${API_BASE_URL}/fruit`; // 요청할 url 주소
                const config = { withCredentials: true };
                const response = await axios.get<Fruit>(url, config);
                setFruit(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchResult(); // 직접 호출
    }, []);

    return (
        <>
            <Table hover style={{ margin: '20px' }}>
                <tbody>
                    <tr>
                        <td>아이디</td>

                        {/* optional chaining은 객체가 null 또는 undefined일 때 오류 없이 접근하도록 하는 자바 스크립트 문법입니다.*/}
                        {/* optional chaining : fruit가 null → 아무것도 안 나옴(undefined 반환), fruit가 존재 → id 출력 */}
                        <td>{fruit?.id}</td>
                    </tr>
                    <tr>
                        <td>상품명</td>
                        <td>{fruit?.name}</td>
                    </tr>
                    <tr>
                        <td>단가</td>
                        <td>{fruit?.price.toLocaleString()}원</td>
                    </tr>
                </tbody>
            </Table >
        </>
    );
}

export default App;