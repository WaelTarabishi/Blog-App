import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../Slices/authApiSlice';
import { logout } from '../Slices/authSlice';
import { toggelTheme } from '../Slices/themeSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Header = () => {
    const dispatch = useDispatch();
    const [logOutApiCall] = useLogoutMutation()
    const { userInfo } = useSelector((state) => state.auth);
    const { theme } = useSelector(state => state.theme)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    const [isCollapsed, setIsCollapsed] = useState(false);
    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const logoutHandleSubmit = async () => {
        try {
            await logOutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(Error)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    const path = useLocation().pathname
    return (
        <Navbar className='border-b-2'>
            <Link className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className=' text-white bg-gradient-to-r from-cyan-500 to-blue-500   rounded-lg  px-2 py-1 text-center '>Dev's</span>
                Blog
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='inline '
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </form>
            {/* <Button className='lg:hidden w-12 h-10 ' color='gray' pill><AiOutlineSearch /></Button> */}
            <div className='flex  gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => { dispatch(toggelTheme(theme)) }}>
                    {theme === "light" ? (<FaMoon />) : (<FaSun />)}

                </Button>
                {userInfo ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt='user' img={userInfo.profilePicture} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{userInfo.name}</span>
                            <span className='block text-sm font-medium truncate'>
                                {userInfo.email}
                            </span>
                        </Dropdown.Header>
                        {userInfo.isAdmin && (<Link to={'/dashboard?tab=dash'}>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                        </Link>)}

                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={logoutHandleSubmit}  >Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (

                    <Link to="/sign-in">
                        <Button outline gradientDuoTone="greenToBlue"  >
                            Sing in
                        </Button>
                    </Link>
                )
                }
            </div >
            <Navbar.Toggle className='sm:mt0 mt-[1.4px]' />
            <Navbar.Collapse >
                <Navbar.Link active={path === "/"} as={"div"} onClick={() => { navigate('/') }} className='cursor-pointer' >
                    Home
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"} onClick={() => { navigate('/about') }} className='cursor-pointer'>

                    About

                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"} onClick={() => { navigate('/projects') }} className='cursor-pointer'>
                    Projects

                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header