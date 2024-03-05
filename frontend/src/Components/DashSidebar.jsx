import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
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
                <Sidebar.ItemGroup  >
                    {userInfo && userInfo.isAdmin && (
                        <Link to={`/dashboard?tab=dash`}>
                            <Sidebar.Item active={tab === "dash" || !tab} as={'div'} icon={HiChartPie} className="">Dashboard</Sidebar.Item>
                        </Link>
                    )}
                    <Link to='/dashboard?tab=profile' >
                        <Sidebar.Item active={tab === "profile"} as={'div'} icon={HiUser} label={userInfo.isAdmin ? "Admin" : "User"} labelColor='dark'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {userInfo && userInfo.isAdmin && (
                        <>

                            <Link to='/dashboard?tab=posts'>
                                <Sidebar.Item active={tab === "posts"} as={'div'} icon={HiDocumentText} className="mt-2 ">Posts</Sidebar.Item>
                            </Link>
                            <Link to='/dashboard?tab=users'>
                                <Sidebar.Item active={tab === "users"} as={'div'} icon={HiOutlineUserGroup} className="mt-2">Users</Sidebar.Item>
                            </Link>
                            <Link to='/dashboard?tab=comments'>
                                <Sidebar.Item active={tab === "comments"} as={'div'} icon={HiAnnotation} className="mt-2">Comments</Sidebar.Item>
                            </Link>


                        </>
                    )}
                    <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={logoutHandleSubmit}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar >
    )
}

export default DashSidebar