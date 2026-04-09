import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import type { User } from "../types/User";
import { useState } from "react";

interface ProductInsertFormProps {
    user: User | null;
}

function App(user: ProductInsertFormProps) {
    const comment = '상품 등록';

    const initial_value = {
        name: '',
        price: '',
        category: '',
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

    const ControlChange = () => { };

    const FileSelect = () => { };

    console.log('자바스크립트 코딩 영역')

    return (
        <Container style={{ marginTop: '30px' }}>
            <h1>{comment}</h1>

            {/* 일반 오류 메시지 */}
            {errors.general && <Alert variant="danger">{errors.general}</Alert>}

            <Form>
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
                <Form.Group as={Row} className="mb-3" controlId="formPrice">
                    <Form.Label column sm={2}>
                        가격
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
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
                            <option value="ALL">모든 상품(전체)</option>
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
                <Form.Group as={Row} className="mb-3" controlId="formStock">
                    <Form.Label column sm={2}>
                        재고
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
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