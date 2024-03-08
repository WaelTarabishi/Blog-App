import {
    useGetallcommentsMutation, useDeletecommentMutation, useGetcommentsmoreMutation
} from '../Slices/authApiSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Table, Button, Modal, Spinner } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { UsersProfile } from './';
const DashComments = () => {
    const [getallcomments, { isLoading }] = useGetallcommentsMutation()
    const [getcommentsmore] = useGetcommentsmoreMutation()
    const [deletecomment] = useDeletecommentMutation()
    const [commentsNumber, setCommentsNumber] = useState(0)
    const [usersNumber, setUsersNumber] = useState(0)

    const { userInfo } = useSelector(state => state.auth)
    const [comments, setComments] = useState([])
    const [commentToDelete, setCommentIdToDelete] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [loadShowMore, setLoadShowMore] = useState(false)
    const fetchComments = async () => {
        if (!userInfo.isAdmin) {
            navigate("/dashboard?tab=profile")
        }
        try {
            const res = await getallcomments().unwrap()
            // console.log(res)
            setComments(res.comments)
            setCommentsNumber(res.comments.length);
            if (res.comments.length < 9) {
                setShowMore(false)
            }
            else {
                setShowMore(true)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchComments()
    }, [userInfo._id])
    const onClickDeleteCommentHandler = async () => {
        await deletecomment(commentToDelete).unwrap()
        setComments((prev) => prev.filter((comment) => comment._id !== commentToDelete));
        setOpenModal(false)
        setCommentIdToDelete("")
    }
    const showMoreHandle = async () => {
        setLoadShowMore(true)
        try {
            const res = await getcommentsmore(commentsNumber)
            console.log(res.data.comments)
            setComments((prev) => [...prev, ...res.data.comments]);
            setCommentsNumber(prevNumber => prevNumber + res.data.comments.length); // Increment postsNumber

            if (res.data.comments.length < 9) {
                setShowMore(false);
            }
            setLoadShowMore(false);

        } catch (err) {
            console.log(err)
            setLoadShowMore(false)
        }
    }
    console.log(commentToDelete)
    return (
        <div className="table-auto overflow-x-scroll md:mx-auto my-10 px-4 sm:scrollbar-none   scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-700  w-full" >
            {userInfo.isAdmin && comments.length > 0 ? (
                <>
                    <Table hoverable>
                        <Table.Head className='shadow-md w-full'>
                            <Table.HeadCell>DateUpdated</Table.HeadCell>
                            <Table.HeadCell>CommentContent</Table.HeadCell>
                            <Table.HeadCell>NumberOfLikes</Table.HeadCell>
                            <Table.HeadCell>PostId</Table.HeadCell>
                            <Table.HeadCell>UserId</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Delete</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {
                            comments.map((comment) => (
                                <Table.Body className="divide-y items-center justify-center h-24" key={comment._id}>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>  {new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>
                                            {comment.content}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {comment.numberOfLikes}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to={``}>
                                                {comment.postId}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/user-profile/${comment.userId}`}>
                                                {comment.userId}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span
                                                onClick={() => {
                                                    setOpenModal(true)
                                                    setCommentIdToDelete(comment._id);

                                                }}
                                                className='font-medium text-red-500 hover:underline cursor-pointer'
                                            >
                                                Delete
                                            </span>
                                        </Table.Cell>

                                    </Table.Row>
                                </Table.Body>
                            ))
                        }
                    </Table>
                    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this post?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={onClickDeleteCommentHandler}  >
                                        {"Yes, I'm sure"}
                                    </Button>
                                    <Button color="gray" onClick={() => setOpenModal(false)}>
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {showMore && (
                        <button className={`w-full text-center text-blue-500 mt-2 cursor-pointer hover:text-blue-400`} onClick={showMoreHandle} disabled={loadShowMore}  >
                            {loadShowMore ? (<Spinner size="md" />) : (<span>Show more</span>)}
                        </button>
                    )}
                </>)
                : !isLoading && comments.length == 0 ? (<div className='flex justify-center items-center h-full text-xl font-semibold  '>There's no Comments right now</div>) :
                    (<div className='flex justify-center items-center h-full gap-2'>
                        <span>
                            <Spinner color="info" size='md' aria-label="Info spinner example" />
                        </span>
                        <span className='text-xl font-semibold'>
                            Loading...
                        </span>
                    </div>)
            }
        </div >
    )
}

export default DashComments