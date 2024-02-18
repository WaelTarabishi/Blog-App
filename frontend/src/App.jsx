import { Outlet } from 'react-router-dom';
import { Header } from './Components';
import FooterComp from './Components/FooterComp';

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <FooterComp />
    </>
  )
}

export default App
