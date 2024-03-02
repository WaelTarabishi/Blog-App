import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput, Textarea, Alert, Spinner } from 'flowbite-react';
import { useCreatcommentMutation } from '../Slices/authApiSlice';
import { HiInformationCircle } from 'react-icons/hi';
const CommentSection = ({ postId }) => {
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const [erroHandlerForCommentLength, setErrorHandlerForCommentLength] = useState(false)
    const [createcomment, { isLoading, isSuccess, isError }] = useCreatcommentMutation()
    const commentHandleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length > 200) {
            setErrorHandlerForCommentLength(true)
            return
        }
        await createcomment({ postId, userId: userInfo._id, content: comment })
    }
    // console.log(userInfo)

    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {
                userInfo ? (
                    <div className='flex flex-row items-center gap-1 my-5 text-gray-500 text-sm ' >
                        <p>Signed in as :</p>
                        <img src={userInfo.profilePicture} className='h-5 w-5 object-cover rounded-full' alt="UserPicture" />
                        <Link to={'/dashboard?tab=profile'} className='text-xs  text-cyan-600 hover:underline'>
                            @{userInfo.name}
                        </Link>
                    </div >
                ) : (

                    <div className='text-sm text-teal-500 my-5 flex gap-1 '>
                        You must be signed in to Comment.
                        <Link className='text-blue-500 hover:underline' to={'/sign-in'}>Sign In</Link>
                    </div>
                )}
            {userInfo && (
                <>
                    <form className=' border border-teal-500 p-4 rounded-md ' onSubmit={commentHandleSubmit}>
                        <Textarea placeholder='Add a comment...' className='mt-2' rows='3' value={comment} maxLength='200' onChange={(e) => setComment(e.target.value)} />
                        <div className='flex flex-row justify-between mt-5 items-center'>
                            <p className='text-gray-500 text-xs'>{200 - comment.length} characters remaining</p>
                            <Button type='submit' outline  >{isLoading ? (<div className='flex flex-row gap-2'><span>Loading...</span><Spinner size="sm" /></div>) : ("Submit")}</Button>
                        </div>
                    </form>
                    {erroHandlerForCommentLength && (
                        <Alert className='mt-1 mb-6' icon={HiInformationCircle} color="failure">
                            You Can't create comment wiht more than 200 characters
                        </Alert>
                    )}
                    {/* {isSuccess && (
                        <Alert className='mt-1 mb-6' icon={HiInformationCircle} color="success">
                        </Alert>
                    )} */}
                </>
            )}
        </div>
    )
}

export default CommentSection