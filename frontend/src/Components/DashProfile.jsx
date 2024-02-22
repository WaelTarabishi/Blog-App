import { Button, TextInput } from 'flowbite-react';
import { useSelector } from 'react-redux';
const DashProfile = () => {
    const { userInfo } = useSelector((state) => state.auth)
    return (
        <div className='mx-auto max-w-lg p-3 w-full'>
            <form className="flex flex-col gap-4">
                <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
                <div className="w-32 h-32 self-center cursor-pointer shadow-xl mt-10 border-5 border-[lightgray] rounded-full overflow-hidden">
                    <img
                        className='rounded-full object-cover w-full h-full border-2 p-[0.5px]'
                        src={userInfo.profilePicture}
                        alt='Profile Picture'
                    />
                </div>
                <TextInput type="text" id='username' placeholder='username' defaultValue={userInfo.name} />
                <TextInput type="email" id='email' placeholder='email' defaultValue={userInfo.email} />
                <TextInput type="password" id='password' placeholder='password' />
                <Button gradientDuoTone="greenToBlue" type='submit' >Update</Button>
            </form >
            <div className='flex flex-row justify-between mt-2 text-red-600'>
                <div className='cursor-pointer'>Delete Account</div>
                <div className='cursor-pointer'>Sign Out</div>
            </div >
        </div >
    )
}

export default DashProfile