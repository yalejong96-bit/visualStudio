import './App.css';

// 외부 컴포넌트 import 하기
// import 컴포넌트이름 from '경로와 파일명';
import MenuItems from './ui/MenuItems';
import AppRoutes from './routes/AppRoutes';

function App(){
  const appName = "IT Academy Coffee Shop" ;

  return(
    <>
      <MenuItems appName={appName} />
      <AppRoutes />

       <footer className="bg-dark text-light text-center py-3 mt-5">
        <p>&copy; 2025 {appName}. All rights reserved.</p>
      </footer>      
    </>
  );
}

export default App;