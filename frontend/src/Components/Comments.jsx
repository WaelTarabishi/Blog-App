import { useEffect, useState } from 'react';
import { useGetuserMutation } from '../Slices/authApiSlice';
import moment from 'moment';
import { Alert, Button, FileInput, Select, TextInput, Spinner } from 'flowbite-react';


const Comments = ({ comment }) => {
    const [getuser, { isLoading }] = useGetuserMutation()
    const [user, setUser] = useState('')
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getuser(comment.userId).unwrap()
            // console.log(res)
            setUser(res)
        }
        fetchUser()
    }, [comment])
    // console.log(comment)
    return (
        <>
            {isLoading ? (<div className='gap-2'>Loading...<Spinner color="info" size='sm' aria-label="Info spinner example" /></div>) : (
                <div className='flex gap-2'>
                    <div className="">
                        <img className='w-10 h-10 rounded-full bg-gray-400' src={user.profilePicture} alt={user.username}></img>
                    </div>
                    <div className=''>
                        <div>
                            <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : "anonymous user"}</span>
                            <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span><br />
                            <span className='text-gray-500 pb-2'>{comment.content}</span>
                        </div>
                    </div>
                </div>)}

        </>
    )
}

export default Comments