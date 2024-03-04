import { useEffect, useState } from 'react';
import { useGetuserMutation, useGetcommentlikesMutation } from '../Slices/authApiSlice';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comments = ({ comment, onLike }) => {
    const [getuser, { isLoading }] = useGetuserMutation()
    const [user, setUser] = useState('')
    const { userInfo } = useSelector((state) => state.auth);

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

            <div>
                <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
                    <div className='flex-shrink-0 mr-3'>
                        <img
                            className='w-10 h-10 rounded-full bg-gray-0'
                            src={user.profilePicture}
                            alt={user.username}
                        />
                    </div>
                    <div className='flex-1'>
                        <div className='flex items-center mb-1'>
                            <span className='font-bold mr-1 text-xs truncate'>
                                {user ? `@${user.username}` : 'anonymous user'}
                            </span>
                            <span className='text-gray-500 text-xs'>
                                {moment(comment.createdAt).fromNow()}
                            </span>
                        </div>
                        <span className='text-gray-500 pb-2'>
                            {comment.content}
                        </span>
                        <div className='flex flex-row items-center gap-2 justify-start mt-2'>
                            <button className={`text-gray-400   ${userInfo && comment.likes.includes(userInfo._id) && "!text-blue-500"} `} onClick={() => { onLike(comment._id) }} disabled={isLoading} >
                                <FaThumbsUp className='text-sm ' />
                            </button>
                            <p className='text-gray-400 pt'>
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes +
                                    ' ' +
                                    (comment.numberOfLikes === 1 ? 'Like' : 'Likes')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comments