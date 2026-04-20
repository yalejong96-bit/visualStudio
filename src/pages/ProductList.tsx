import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

import customAxios from './../api/axiosInstance';

import { API_BASE_URL } from "../config/config";
import type { User } from "../types/User";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Paging from './Paging';

import { initialPagingInfo, type PagingInfo } from '../types/Paging';

type ProductProps = {
    user: User | null; // 로그인 하면 의미 있는 객체, 아니면 null
};

function App({ user }: ProductProps) {
    const [products, setProducts] = useState<Product[]>([]);

    const [paging, setPaging] = useState<PagingInfo>(initialPagingInfo);

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

    const navigate = useNavigate();

    const makeAdminButtons = (item: Product, user: User | null, navigate: any) => {
        if (user?.role !== 'ADMIN') return null;

        return (
            <div className="d-flex justify-content-center">
                <Button
                    variant="warning"
                    className="mb-2"
                    size="sm"
                    onClick={(event) => {
                        event.stopPropagation(); // 이벤트 버블링 방지
                        navigate(`/product/update/${item.id}`);
                    }}>
                    수정
                </Button>

                &nbsp;

                <Button
                    variant="danger"
                    className="mb-2"
                    size="sm"
                    onClick={async (event) => {
                        event.stopPropagation();

                        const isDelete = window.confirm(`${item.name} 상품을 삭제하시겠습니까?`);

                        if (isDelete === false) {
                            /* sweet alert2 */
                            alert(`${item.name} 상품 삭제를 취소하였습니다.`);
                            return;
                        }

                        try {
                            const url = `${API_BASE_URL}/product/delete/${item.id}`;
                            await axios.delete(url);
                            alert(`'${item.name}' 상품이 삭제되었습니다.`)

                            // prev는 이전 상품 목록
                            setProducts(prev => prev.filter(p => p.id !== item.id));

                            navigate('/product/list');

                        } catch (error) {
                            console.log(error);
                            if (axios.isAxiosError(error)) {
                                alert(`상품 삭제 실패 : ${error.response?.data || error.message}`)
                            } else {
                                console.log('알수 없는 에러 : ' + error);
                            }
                        };

                    }}>
                    삭제
                </Button>
            </div>
        );
    };

    return (
        <Container className="my-4">
            <h1 className="my-4">상품 목록 페이지</h1>

            <Link to={`/product/insert`}>
                {user?.role === 'ADMIN' && (
                    <Button variant="primary" className="mb-3">
                        상품 등록
                    </Button>
                )}
            </Link>

            {/* 필드 검색 영역 */}

            {/* 자료 보여 주는 영역 */}
            <Row>
                {/* products는 상품 배열, item는 상품 1개를 의미 */}
                {products.map((item) => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100"
                            onClick={() => navigate(`/product/detail/${item.id}`)}
                            style={{ cursor: 'pointer' }}>

                            <Card.Img
                                variant="top"
                                src={`${API_BASE_URL}/images/${item.image}`}
                                alt={item.name}
                                style={{ width: '100%', height: '200px' }}
                            />
                            <Card.Body>
                                <table style={{ width: '100%', borderCollapse: 'collapse', border: 'none' }}>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: '70%', padding: '4px', border: 'none' }}>
                                                <Card.Title>{item.name}({item.id})</Card.Title>
                                            </td>
                                            <td rowSpan={2} style={{ padding: '4px', border: 'none', textAlign: 'center', verticalAlign: 'middle' }}>
                                                {makeAdminButtons(item, user, navigate)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: '70%', padding: '4px', border: 'none' }}>
                                                <Card.Text>가격 : {item.price.toLocaleString()} 원</Card.Text>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>



                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* 페이징 처리 영역 */}
            <Paging
                paging={paging}
                setPaging={setPaging}
            />

        </Container>
    );
}

export default App;