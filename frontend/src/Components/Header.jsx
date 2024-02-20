import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../Slices/userApiSlice';
import { logout } from '../Slices/authSlice';
import { toggelTheme } from '../Slices/themeSlice';

const Header = () => {
    const dispatch = useDispatch();
    const [logOutApiCall] = useLogoutMutation()
    const { userInfo } = useSelector((state) => state.auth);
    const { theme } = useSelector(state => state.theme)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await logOutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(Error)
        }
    }
    const path = useLocation().pathname
    return (
        <Navbar className='border-b-2'>
            <Link className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className=' text-white bg-gradient-to-r from-cyan-500 to-blue-500   rounded-lg  px-2 py-1 text-center '>Dev's</span>
                Blog
            </Link>
            <form>
                <TextInput type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline' />
            </form>
            <Button className='lg:hidden w-12 h-10 ' color='gray' pill><AiOutlineSearch /></Button>
            <div className='flex  gap-2 md:order-2'>
                <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={() => { dispatch(toggelTheme(theme)) }}>
                    <FaMoon />
                </Button>
                {userInfo ? (
                    <Dropdown arrowIcon={false} inline label={
                        <Avatar rounded>
                            <div className="space-y-1 font-medium dark:text-white">
                                <div><Link to="/dashboard">{userInfo.name}</Link></div>
                            </div>
                        </Avatar>}>
                        <Dropdown.Header>
                            <span className='block text-sm'>{userInfo.email}</span>
                        </Dropdown.Header>
                    </Dropdown>
                ) : (

                    <Link to="/sign-in">
                        <Button outline gradientDuoTone="greenToBlue"  >
                            Sing in
                        </Button>
                    </Link>
                )
                }
                <Navbar.Toggle />
            </div >
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={"div"}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={"div"}>
                    <Link to="/about">
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/projects"} as={"div"}>
                    <Link to="/projects">
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Header