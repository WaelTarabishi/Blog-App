import { Outlet } from 'react-router-dom';
import { Header, FooterComp, ScrollToTop } from './Components';

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
