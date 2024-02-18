import { Button, Label, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../Slices/authSlice';
import { useRegisterMutation } from '../Slices/userApiSlice';
const Singup = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const handleChange = (e) => {
    };

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (err) {
            setIsError(err?.data?.message || err.error)

        }
    }
    return (
        <div className="flex min-h-screen justify-center  bg-red   pl-3 pr-3 ">

            <div className='w-full flex items-center  justify-center md:flex-row  flex-col  gap-4 flex-1 '>
                <div className='flex flex-col gap-4   justify-center  h-full md:w-auto md:pl-0  w-full    '>
                    <Link to='/' className=' whitespace-nowrap  md:text-4xl  text-3xl font-semibold dark:text-white'>
                        <span className=' text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500   rounded-lg  px-2 py-1 text-center '>Dev's</span>
                        Blog
                    </Link>
                    <p className=' text-black text-sm '>You can sing up with your email and password or with google </p>
                </div>

                <div className='flex-[0.5] flex-col  items-center w-full '>

                    <form className="flex max-w-md flex-col gap-4  w-full  flex-1" onSubmit={handleSubmit}>
                        <div >
                            <div className="mb-2 block ">
                                <Label htmlFor="username" value="Your Name" />
                            </div>
                            <TextInput type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput type='email'
                                placeholder='name@company.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button>

                    </form>
                    <div className='text-black text-sm mt-5 flex gap-2'>
                        <span>Have an account?</span>
                        <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Singup