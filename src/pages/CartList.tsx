import { Alert, Button, Col, Container, Form, Image, Row, Table } from "react-bootstrap";

import type { User } from "../types/User";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import customAxios from './../api/axiosInstance';
import type { CartProduct } from "../types/CartProduct";
import { API_BASE_URL } from "../config/config";
// import { all } from "axios";

/* 
구조 분해 할당 + 타입 지정

정석적인 표현은 이렇습니다.
    function App(props: AppProps) {
        const user = props.user;
    }

줄여서 쓴 것이:
    function App({ user }: AppProps)
*/

type AppProps = {
    user: User | null; // user는 User 객체 혹은 null일 수도 있습니다.
}

function App({ user }: AppProps) {
    const thStyle = { fontSize: '1.2rem', textAlign: 'center' } as const; // 테이블 헤더 스타일    

    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    // 오류 정보를 저장할 스테이트
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // 오류 처리를 위한 공용 함수 작성
    const handleApiError = (error: any) => {
        console.log(error);

        if (error.response) { // 서버에서 내려준 에러
            const message = error.response.data;
            setErrorMessage(message);

        } else {
            setErrorMessage('서버와 통신할 수 없습니다.')
        }
    };

    useEffect(() => {
        if (user && user?.id) {
            fetchCartProducts();
        }
    }, [user]);

    const navigate = useNavigate();

    const fetchCartProducts = async () => {
        try {
            const url = `${API_BASE_URL}/cart/list`;
            const response = await customAxios.get(url);
            console.log('카트 상품 조회');
            console.log(response.data);

            setCartProducts(response.data || []);

        } catch (error) {
            console.log('오류 정보');
            handleApiError(error);
            alert(`'카트 상품' 정보가 존재하지 않아서 상품 목록 페이지로 이동합니다.`);
            navigate('/product/list')
        }
    };

    const [orderTotalPrice, setOrderTotalPrice] = useState(0);

    const refreshOrderTotalPrice = (products: CartProduct[]) => {
        let total = 0;

        products.forEach((bean) => {
            if (bean.checked) {
                total += bean.price * bean.quantity;
            }
        });

        setOrderTotalPrice(total);
    };

    const toggleAllCheckBox = (isAllCheck: boolean) => {
        setAllCheck(!!isAllCheck);
        setCartProducts((previous) => {
            const updatedProducts = previous.map((product) => ({
                ...product,
                checked: isAllCheck
            }));

            refreshOrderTotalPrice(updatedProducts);

            return updatedProducts;
        });
    };

    const toggleCheckBox = (cartProductId: number) => {
        console.log(`카트 상품 아이디 : ${cartProductId}`);

        setCartProducts((previous) => {
            const updatedProducts = previous.map((product) =>
                product.cartProductId === cartProductId
                    ? { ...product, checked: !product.checked }
                    : product
            );

            // const isEverySingleItemChecked = updatedProducts.length > 0 &&
            //     updatedProducts.every(p => p.checked);

            // setAllCheck(isEverySingleItemChecked);

            setAllCheck(updatedProducts.filter(p => p.checked).length == updatedProducts.length)

            refreshOrderTotalPrice(updatedProducts);

            return updatedProducts;
        });
    };

    const [allCheck, setAllCheck] = useState(false);

    const changeQuantity = async (cartProductId: number, quantity: number) => {
        // Nan : Not a Number
        if (isNaN(quantity)) { // 숫자 형식이 아니면

            alert('수량 변경은 최소 1이상이어야 합니다.')
            return;
        }

        try {
            const parameter = `quantity=${quantity}`;

            const url = `${API_BASE_URL}/cart/edit/${cartProductId}?${parameter}`;

            const response = await customAxios.patch(url);

            console.log(response.data || '')

            // cartProducts의 수량 정보를 갱신합니다.
            setCartProducts((previous) => {
                const updatedProducts = previous.map((product) =>
                    product.cartProductId === cartProductId
                        ? { ...product, quantity: quantity }
                        : product
                );

                refreshOrderTotalPrice(updatedProducts);
                return updatedProducts;
            });
        } catch (error) {
            console.log('카트 상품 수량 변경 실패');
            handleApiError(error);
        }
    };

    const deleteCartProduct = async (cartProductId: number) => {
        const isConfirmed = window.confirm('해당 카트 상품을 정말로 삭제하시겠습니까?');

        if (isConfirmed) {
            try {
                const url = `${API_BASE_URL}/cart/delete/${cartProductId}`;
                const response = await customAxios.delete(url);

                setCartProducts((previous) => {
                    const updatedProducts
                        = previous.filter((bean) => bean.cartProductId !== cartProductId);

                    refreshOrderTotalPrice(updatedProducts);

                    return updatedProducts;
                });

                alert(response.data);

            } catch (error) {
                console.log('카트 상품 삭제 동작 오류');
                handleApiError(error);
            }

        } else {
            alert(`'카트 상품' 삭제를 취소하셨습니다.`);
        }
    };

    // 사용자가 주문하기 버튼을 클릭하였습니다.
    const makeOrder = async () => {
        const selectedProducts = cartProducts.filter((bean) => bean.checked);

        if (selectedProducts.length === 0) {
            alert('주문할 상품을 선택해 주세요.')
            return;
        }

        const hasInvalid = selectedProducts.some(product => product.quantity === 0);
        if (hasInvalid) {
            alert('최소 주문 상품 수량은 1개이상이어야 합니다.');
            return;
        }

        try {
            const url = `${API_BASE_URL}/order`;
            const parameters = {
                memberId: user?.id,
                status: 'PENDING',
                orderItems: selectedProducts.map((product) => ({
                    cartProductId: product.cartProductId,
                    productId: product.productId,
                    quantity: product.quantity
                }))
            };

            console.log('주문할 데이터 정보');
            console.log(parameters);

            const response = await customAxios.post(url, parameters);

            alert(response.data);

            setCartProducts((previous) =>
                previous.filter((product) => !product.checked)
            );

            setOrderTotalPrice(0);


        } catch (error) {
            console.log('주문 기능 실패');
            handleApiError(error);
        }
    };

    const deleteOrder = async () => {
        const selectedProducts = cartProducts.filter((bean) => bean.checked);


        if (selectedProducts.length === 0) {
            alert('삭제할 상품이 없습니다.')
            return;
        }

        const isConfirmed = window.confirm(`선택한 ${selectedProducts.length}개의 상품을 삭제하시겠습니까?`);

        if (isConfirmed) {
            try {
                await Promise.all(
                    selectedProducts.map(p =>
                        customAxios.delete(`${API_BASE_URL}/cart/delete/${p.cartProductId}`)
                    )
                );
                alert('삭제되었습니다.');

                setCartProducts((previous) => {
                    const updatedProducts = previous.filter((product) => !product.checked);
                    refreshOrderTotalPrice(updatedProducts);
                    return updatedProducts;
                });

                setAllCheck(false);

            } catch (error) {
                console.log('삭제 기능 실패');
                handleApiError(error);
            }

        };
    }
    return (
        <Container className="mt-4">
            {errorMessage && (
                <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
                    {errorMessage}
                </Alert>
            )}
            <h2 className="mb-4">
                {/* xxrem은 주위 글꼴의 xx배를 의미합니다. */}
                <span style={{ color: 'blue', fontSize: '2rem' }}>{user?.name}</span>
                <span style={{ fontSize: '1.3rem' }}>님의 장바구니</span>
            </h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th style={thStyle}>
                            <Form.Check
                                type="checkbox"
                                label="전체 선택"
                                checked={allCheck}
                                onChange={(e) => {
                                    const checked = e.target.checked;
                                    setAllCheck(checked);
                                    toggleAllCheckBox(checked);
                                }}
                            />
                        </th>
                        <th style={thStyle}>상품 정보</th>
                        <th style={thStyle}>재고</th>
                        <th style={thStyle}>수량</th>
                        <th style={thStyle}>단가</th>
                        <th style={thStyle}>금액</th>
                        <th style={thStyle}>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {cartProducts.length > 0 ? (
                        cartProducts.map((product) => (
                            <tr key={product.cartProductId}>
                                <td className="text-center align-middle">
                                    <Form.Check
                                        type="checkbox"
                                        checked={product.checked}
                                        onChange={() => toggleCheckBox(product.cartProductId)}
                                    />
                                </td>
                                <td className="text-center align-middle">
                                    <Row> {/* 좌측 4칸은 이미지 영역, 우측 8칸은 상품 이름 영역 */}
                                        <Col xs={4}>
                                            <Image
                                                src={`${API_BASE_URL}/images/${product.image}`}
                                                thumbnail
                                                alt={product.name}
                                                width={`80`}
                                                height={`80`}
                                            />
                                        </Col>
                                        <Col xs={8} className="d-flex align-items-center">
                                            {product.name}({product.cartProductId})
                                        </Col>
                                    </Row>
                                </td>
                                <td className="text-center align-middle">
                                    {(product.stock).toLocaleString()}
                                </td>
                                <td className="text-center align-middle">
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        value={product.quantity}
                                        style={{ width: '80px', margin: '0 auto' }}
                                        onChange={(event) =>
                                            changeQuantity(
                                                product.cartProductId,
                                                parseInt(event.target.value)
                                            )}
                                    />
                                </td>
                                <td className="text-center align-middle">
                                    {(product.price).toLocaleString()} 원
                                </td>
                                <td className="text-center align-middle">
                                    {(product.price * product.quantity).toLocaleString()} 원
                                </td>
                                <td className="text-center align-middle">
                                    <Button variant="danger" size="sm"
                                        onClick={() => deleteCartProduct(product.cartProductId)}
                                    >
                                        삭제
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr><td>장바구니가 비어 있습니다.</td></tr>
                    )}
                </tbody>
            </Table>

            {/* 좌측 정렬(text-start), 가운데 정렬(text-center), 우측 정렬(text-end) */}
            <h3 className="text-end mt-3">총 주문 금액 : {orderTotalPrice.toLocaleString()}원</h3>
            <div className="d-flex justify-content-end mt-3">
                <Button variant="danger" className="me-3 px-4" size="lg" onClick={deleteOrder}>
                    삭제하기
                </Button>

                <Button variant="primary" className="me-3 px-4" size="lg" onClick={makeOrder}>
                    주문하기
                </Button>
            </div>
        </Container>
    );
}

export default App;