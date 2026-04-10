import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import type { User } from "../types/User";
import { useState } from "react";

import axios from "axios";
import customAxios from './../api/axiosInstance';


import { API_BASE_URL } from "../config/config";
import { useNavigate } from "react-router-dom";


interface ProductInsertFormProps {
    user: User | null;
}

function App({ user }: ProductInsertFormProps) {
    const navigate = useNavigate();

    const comment = '상품 등록';

    const initial_value = {
        name: '',
        price: '',
        category: '-',
        stock: '',
        image: '',
        description: ''
    };
    // product는 등록하고자 하는 상품의 정보
    const [product, setProduct] = useState(initial_value);

    const initialErrors = {
        name: '',
        price: '',
        category: '',
        stock: '',
        image: '',
        description: '',
        general: ''
    };

    const [errors, setErrors] = useState(initialErrors);

    // form 양식에서 어떠한 컨트롤의 값이 변경 되었습니다.
    const ControlChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setProduct({ ...product, [name]: value });
    };

    const FileSelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, files } = event.target;

        if (!files || files.length === 0) {
            alert('이미지 파일을 선택해 주셔야 합니다.');
            return;
        }

        const file = files[0]; // type="file"로 작성한 첫 번째 항목

        // FileReader : 이미지(바이트) 파일을 읽어서 JS가 이해할 수 있도록 변경해주는 번역기
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            const result = reader.result;

            // [name]는 name 변수의 값, 즉 image의 값을 바꾸겠습니다.
            // name이라고 적으면 무조건 상품 이름(name)이 계속 변경됩니다.
            setProduct({ ...product, [name]: result })
        };


    };

    const SubmitAction = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(product.category === '-'){
            alert('상품 카테고리는 반드시 선택해 주셔야 합니다.');
            return ;
        }

        try{
            const url = `${API_BASE_URL}/product/insert`;
            const config ={
                headers:{ 'Content-Type': 'application/json' }
            };

            const response = await customAxios.post(url, product, config);

            console.log('응답 데이터 : ');
            console.log(`${response.data}`);


            alert('상품이 등록되었습니다.');

            setProduct(initial_value);
            setErrors(initialErrors);

            navigate('/product/list');

        }catch (error: unknown) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                // 백엔드에서 전달받은 오류 메시지를 저장
                setErrors((prev) => ({
                    ...prev,
                    ...error.response?.data?.errors,
                    general: error.response?.data?.message || '상품 등록 중 오류가 발생했습니다.'
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    general: '서버와의 통신 중 오류가 발생했습니다.'
                }));
            }
        };
    };


    return (
        <Container style={{ marginTop: '30px' }}>
            <h1>{comment}</h1>

            {/* 일반 오류 메시지 */}
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}

            <Form onSubmit={SubmitAction}>
                {/* 이름 */}
                <Form.Group as={Row} className="mb-3" controlId="forName">
                    <Form.Label column sm={2}>
                        이름
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="이름을(를) 입력해 주세요."
                            name="name"
                            value={product.name}
                            onChange={ControlChange} // onChange를 작동시키면 const ControlChange = () => {} ;가 작동
                            isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 가격 */}
                <Form.Group as={Row} className="mb-3" controlId="formPrice">
                    <Form.Label column sm={2}>
                        가격
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="가격을(를) 입력해 주세요."
                            name="price"
                            value={product.price}
                            onChange={ControlChange}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 카테고리 */}
                <Form.Group as={Row} className="mb-3" controlId="formCategory">
                    <Form.Label column sm={2}>
                        카테고리
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            name="category"
                            value={product.category}
                            onChange={ControlChange}
                            isInvalid={!!errors.category}
                        >
                            <option value="-">--상품 카테고리를 선택해 주세요.</option>
                            <option value="BREAD">빵</option>
                            <option value="BEVERAGE">음료수</option>
                            <option value="CAKE">케이크</option>
                            <option value="MACARON">마카롱</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 재고 */}
                <Form.Group as={Row} className="mb-3" controlId="formStock">
                    <Form.Label column sm={2}>
                        재고
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="number"
                            placeholder="재고 수량은 10개 이상 입력해 주셔야 합니다."
                            name="stock"
                            value={product.stock}
                            onChange={ControlChange}
                            isInvalid={!!errors.stock}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.stock}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 이미지 */}
                <Form.Group as={Row} className="mb-3" controlId="formImage">
                    <Form.Label column sm={2}>
                        이미지
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="file"
                            name="image"
                            onChange={FileSelect}
                            isInvalid={!!errors.image}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.image}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {/* 상품 설명 */}
                <Form.Group as={Row} className="mb-3" controlId="formDescription">
                    <Form.Label column sm={2}>
                        상품 설명
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="상품 설명을(를) 입력해 주세요."
                            name="description"
                            value={product.description}
                            onChange={ControlChange}
                            isInvalid={!!errors.description}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit" size="lg">
                    {comment}
                </Button>

            </Form>
        </ Container>
    );
};


export default App;