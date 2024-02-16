import { Outlet } from 'react-router-dom';
import { Header } from './Components';

function App() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
