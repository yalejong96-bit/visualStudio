import { Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

import customAxios from './../api/axiosInstance';

import { API_BASE_URL } from "../config/config";

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const url = `${API_BASE_URL}/product/list`;
        customAxios.get(url)
            .then((response) => {
                console.log('응답 받은 데이터');
                console.log(response);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log('자바스크립트 코딩 영역')

    return (
        <Container className="my-4">
            <h1 className="my-4">상품 목록 페이지</h1>

            {/* 필드 검색 영역 */}

            {/* 자료 보여 주는 영역 */}
            <Row>
                {/* products는 상품 배열, item는 상품 1개를 의미 */}
                {products.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100" style={{ cursor: 'pointer' }}>
                            <Card.Img
                                variant="top"
                                src={`${API_BASE_URL}/images/${item.image}`}
                                alt={item.name}
                                style={{ width: '100%', height: '200px' }}
                            />
                            <Card.Body>
                                <Card.Title>{item.name}({item.id})</Card.Title>
                                <Card.Text>가격 : {item.price.toLocaleString()} 원</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 페이징 처리 영역 */}

        </Container>
    )
};

export default App;