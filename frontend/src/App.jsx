import { Outlet } from 'react-router-dom';
import { Header, FooterComp } from './Components';

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
