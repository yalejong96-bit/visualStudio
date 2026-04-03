import { NavDropdown, Navbar, Container, Nav } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

type MenuItemsProps = {
   appName: string;
};

function App({ appName }: MenuItemsProps) {
   console.log('xxx 프롭스 : ' + appName);
   const navigate = useNavigate();

   return (
      <Navbar bg="dark" variant="dark" expand="lg">
         <Container>
            <Navbar.Brand href='/'>{appName}</Navbar.Brand>
            <Nav className="me-auto">
               <Nav.Link onClick={() => navigate(`/member/signup`)}>회원 가입</Nav.Link>
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