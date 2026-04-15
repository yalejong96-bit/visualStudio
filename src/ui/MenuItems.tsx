import { NavDropdown, Navbar, Container, Nav } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import type { User } from "../types/User";

type MenuItemsProps = {
   appName: string;
   user: User | null; // 이 데이터는 null일수도 있습니다.
   handleLogout: (event: React.MouseEvent<HTMLElement>) => void;
};

function App({ appName, user, handleLogout }: MenuItemsProps) {
   console.log('xxx 프롭스 : ' + appName);
   const navigate = useNavigate();

   const renderMenu = () => {
      switch (user?.role) {
         case 'ADMIN':
            return (<>
               <Nav.Link onClick={() => navigate(`/product/insert`)}>상품 등록</Nav.Link>
               {/* 관리자는 모든 사람의 주문 내역 확인 */}
               <Nav.Link onClick={() => navigate(`/order/list`)}>주문 내역</Nav.Link>
               <Nav.Link onClick={handleLogout}>로그 아웃</Nav.Link>
            </>);
         case 'USER':
            return (<>
               <Nav.Link onClick={() => navigate(`/cart/list`)}>장바구니</Nav.Link>
               <Nav.Link onClick={() => navigate(`/order/list`)}>주문 내역</Nav.Link>
               <Nav.Link onClick={handleLogout}>로그 아웃</Nav.Link>
            </>);
         default:
            return (<>
               <Nav.Link onClick={() => navigate(`/member/login`)}>로그인</Nav.Link>
               <Nav.Link onClick={() => navigate(`/member/signup`)}>회원 가입</Nav.Link>
            </>)
      }
   };

   return (
      <Navbar bg="dark" variant="dark" expand="lg">
         <Container>
            <Navbar.Brand href='/'>{appName}</Navbar.Brand>
            <Nav className="me-auto">
               {/* 사용자 이름 표시 */}
               {user && (
                  <Nav.Item className="text-white fw-bold fs-5 me-3 d-flex align-items-center">
                     {user.name}님
                  </Nav.Item>
               )}

               <Nav.Link onClick={() => navigate(`/product/list`)}>상품 보기</Nav.Link>

               {renderMenu()}

               <NavDropdown title={`기본 연습`}>
                  <NavDropdown.Item onClick={() => navigate(`/fruit`)}>과일 1개</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate(`/fruit/list`)}>과일 목록</NavDropdown.Item>
               </NavDropdown>
            </Nav>
         </Container>
      </Navbar >
   );
}

export default App;