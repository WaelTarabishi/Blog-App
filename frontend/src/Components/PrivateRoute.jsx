import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
const PrivateRoute = () => {
    const { currentAuth } = useSelector(state => state.auth)
    return (
        currentAuth ? <Outlet /> : <Navigate to="/sign-in" />
    )
}

export default PrivateRoute