import './App.css';

// 외부 컴포넌트 import 하기
// import 컴포넌트이름 from '경로와 파일명';
import MenuItems from './ui/MenuItems';
import AppRoutes from './routes/AppRoutes';
import React, { useState } from 'react';
import type { User } from './types/User';
import { useNavigate } from 'react-router-dom';

function App() {
  const appName = "IT Academy Coffee Shop";

  const [user, setUser] = useState<User | null>(null);

  useInserEffect(() => {
    const loginUser = localStorage.getItem('user');

    if(typeof loginUser === 'string'){
      const parsed = JSON.parse(loginUser);
        setUser(parsed);
    }
  }, [])

  // 로그인 성공시 처리해야할 동작을 명시하는 함수
  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('로그인 성공')
  };

  const navigate = useNavigate();

  // 사용자가 '로그 아웃' 메뉴 클릭
  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setUser(null);
    localStorage.removeItem('user');
    console.log('로그 아웃 성공');
    navigate('/member/login')
  };

  return (
    <>
      <MenuItems appName={appName} user={user} handleLogout={handleLogout} />
      <AppRoutes user={user} handleLoginSuccess={handleLoginSuccess} />

      <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025 {appName}. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;