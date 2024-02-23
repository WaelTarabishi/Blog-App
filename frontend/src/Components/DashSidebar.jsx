import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useLogoutMutation } from '../Slices/authApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Slices/authSlice';
const DashSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { userInfo } = useSelector((state) => state.auth);
    const [logOutApiCall, { isloading }] = useLogoutMutation()
    const location = useLocation()
    const [tab, setTab] = useState('')

    const logoutHandleSubmit = async () => {
        try {
            await logOutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(err)

        }
    }


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        tabFromUrl && setTab(tabFromUrl)
    }, [location.search])


    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup >
                    <Link to='/dashboard?tab=profile' >
                        <Sidebar.Item active={tab === "profile"} as={'div'} icon={HiUser} label={"User"} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={logoutHandleSubmit}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default DashSidebar