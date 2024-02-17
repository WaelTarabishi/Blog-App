

import { Button, Label, TextInput } from 'flowbite-react';
import { Link, NavLink } from 'react-router-dom';

const Singup = () => {
    return (
        <div className="flex min-h-max justify-center  bg-red  mt-32 pl-3 pr-3 ">

            <div className='w-full flex items-center  justify-center md:flex-row  flex-col  gap-4 flex-1 '>
                <div className='flex flex-col gap-4   justify-center  h-full md:w-auto md:pl-0  w-full    '>
                    <Link to='/' className=' whitespace-nowrap  md:text-4xl  text-3xl font-semibold dark:text-white'>
                        <span className=' text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500   rounded-lg  px-2 py-1 text-center '>Dev's</span>
                        Blog
                    </Link>
                    <p className=' text-black text-sm '>You can sing up with your email and password or with google </p>
                </div>

                <div className='flex-[0.5] flex-col  items-center w-full '>
                    <form className="flex max-w-md flex-col gap-4    w-full  flex-1">
                        <div >
                            <div className="mb-2 block ">
                                <Label htmlFor="username" value="Your Name" />
                            </div>
                            <TextInput id="username" type="text" required placeholder="Username" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password1" type="password" required placeholder="Password" />
                        </div>
                        <button type="submit" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign Up</button>

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