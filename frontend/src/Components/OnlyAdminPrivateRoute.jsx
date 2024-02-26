import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
const OnlyAdminPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)
    return (
        userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/" />
    )
}

export default OnlyAdminPrivateRoute