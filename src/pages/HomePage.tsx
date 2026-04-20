import { Carousel, Container } from "react-bootstrap";
import { API_BASE_URL } from "../config/config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types/Product";

import customAxios from './../api/axiosInstance'

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const url = `${API_BASE_URL}/product?filter=bigs`;
        customAxios.get(url)
            .then((response) => setProducts(response.data))
            .catch((error) => console.log(error));
    }, []);

    const detailView = (id: number) => {
        navigate(`/product/detail/${id}`);
    };

    return (
        <Container className="mt-4">
            <Carousel>
                {products.map((bean) => (
                    <Carousel.Item key={bean.id}>
                        <img
                            className="d-block w-100"
                            src={`${API_BASE_URL}/images/${bean.image}`}
                            alt={bean.name}
                            style={{ cursor: 'pointer' }} // 마우스 오버시 손가락 모양
                            onClick={() => detailView(bean.id)} // 클릭시 상세 보기 페이지
                        />
                        <Carousel.Caption>
                            <h3>{bean.name}</h3>
                            <p>
                                {/* 긴 글자는 짧게 보여 주고, 후위에 ...을 보여줍니다. */}
                                {bean.description.length > 15
                                    ? bean.description.substring(0, 15) + '...'
                                    : bean.description
                                }
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
}

export default App;