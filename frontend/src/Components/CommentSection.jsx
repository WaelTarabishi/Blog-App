import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextInput, Textarea, Alert, Spinner, Modal } from 'flowbite-react';
import { useCreatcommentMutation, useGetpostcommentsMutation, useGetcommentlikesMutation, useDeletecommentMutation } from '../Slices/authApiSlice';
import { HiInformationCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { debounce } from 'lodash';
import { Comments } from './';
const CommentSection = ({ postId }) => {
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const [erroHandlerForCommentLength, setErrorHandlerForCommentLength] = useState(false)
    const [getcommentlikes] = useGetcommentlikesMutation()
    const [deletecomment] = useDeletecommentMutation()
    const [createcomment, { isLoading, isSuccess, isError }] = useCreatcommentMutation()
    const [getpostcomments] = useGetpostcommentsMutation()
    const [comments, setComments] = useState([])
    const [commentToDelete, setCommentToDelete] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useDispatch()
    const commentHandleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length > 200) {
            setErrorHandlerForCommentLength(true)
            return
        }
        const res = await createcomment({ postId, userId: userInfo._id, content: comment }).unwrap()
        // console.log(res)
        // console.log([...comments, res])

        setComments([{ ...res }, ...comments])
        // console.log(comments)
        setComment('')
    }
    // console.log(userInfo)
    useEffect(() => {
        const fetchComments = async () => {
            const res = await getpostcomments(postId).unwrap()
            // console.log(res)
            setComments(res)
        }
        fetchComments()
    }
        , [postId])
    // console.log(comments)
    // console.log(comment)

    const handleLike = async (commentId) => {

        console.log(commentId);

        if (!userInfo) {
            navigate('/sgin-in');
        }
        try {
            const res = await getcommentlikes(commentId).unwrap();
            // console.log(res)
            setComments(comments.map((co) => {
                if (co._id === commentId) {
                    return {
                        ...co,
                        likes: res.likes,
                        numberOfLikes: res.numberOfLikes
                    };
                } else {
                    return co; // Return the original comment if _id doesn't match
                }
            }));

        } catch (err) {
            console.log(err);
        }
    };
    const handleEdit = async (commente, editedContent) => {
        setComments((comments.map((c) => {
            c._id === commente._id ? { ...c, content: editedContent } : c
        }
        )))
    }
    const handleDelete = async (commentId) => {
        setOpenModal(false)
        try {
            if (!userInfo) {
                navigate('/sign-in')
            }
            const res = await deletecomment(commentId).unwrap()
            console.log(res)
            if (res) {
                setComments(comments.filter((comment) => comment._id !== commentId))
            }

        } catch (err) { console.log(err) }
    }
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
                    {comments.length === 0 ? (<span className='text-sm my-5'>No Comments yet!</span>) :
                        (
                            <>
                                <div className='text-sm  my-5 flex items-start gap-1 flex-col'>
                                    <div className='flex flex-row gap-1 items-center'>
                                        <p>Comments:</p>
                                        <div className='border border-gray-400 py-1 px-2 rounded-sm'><p>{comments.length}</p></div>
                                    </div>
                                    <div className='mt-8  w-full '>
                                        {comments && comments.map(mapcomment => (
                                            <Comments
                                                comment={mapcomment}
                                                key={mapcomment._id}
                                                onLike={handleLike}
                                                onEdit={handleEdit}
                                                onDelete={(commentId) => {
                                                    setOpenModal(true)
                                                    setCommentToDelete(commentId)
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                            </>)}

                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this comment?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={() => { handleDelete(commentToDelete) }} >
                                        {"Yes, I'm sure"}
                                    </Button>
                                    <Button color="gray" onClick={() => setOpenModal(false)}>
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </div>
    )
}

export default CommentSection