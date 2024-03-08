import { useSelector } from 'react-redux';
import { useGetpostsMutation, useGetpostsmoreMutation, useDeletepostMutation } from '../Slices/authApiSlice';
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Spinner } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useCache from '../Hooks/useCache';
const DashPosts = () => {
    const { userInfo } = useSelector(state => state.auth)
    const { getData, setData } = useCache();
    const navigate = useNavigate()
    const [getposts, { isLoading }] = useGetpostsMutation()
    const [getpostsmore, { }] = useGetpostsmoreMutation()
    const [deletepost, { }] = useDeletepostMutation()
    const [posts, setPosts] = useState([])
    const [showMore, setShowMore] = useState(false)
    const [postIdToDelete, setPostIdToDelete] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [postsNumber, setPostsNumber] = useState(0)
    const [loadShowMore, setLoadShowMore] = useState(false)
    // const [limitposts, setLimitPosts] = useState(9)
    const fetchPosts = async () => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/dashboard?tab=profile");
            return;
        }
        try {
            const cachedData = getData('postsData');
            // console.log(cachedData)
            if (cachedData) {
                console.log('Data from cache:', cachedData);
                setPosts(cachedData)
            } else {
                console.log('notfrom cache')
                const res = await getposts().unwrap();
                setPosts(res.posts);
                setPostsNumber(res.posts.length);
                setData('postsData', res.posts);

                if (res.posts.length < 9) {
                    setShowMore(false);
                }
                else {
                    setShowMore(true)
                }

            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [userInfo]);
    const showMoreHandle = async () => {
        setLoadShowMore(true);
        try {
            const res = await getpostsmore(postsNumber);
            console.log(res.data.posts);

            setPosts((prev) => [...prev, ...res.data.posts]);
            setPostsNumber(prevNumber => prevNumber + res.data.posts.length); // Increment postsNumber

            if (res.data.posts.length < 9) {
                setShowMore(false);
            }
            setLoadShowMore(false);
        } catch (err) {
            console.log(err);
        }
    }

    const onClickDeletePostHandler = async () => {
        try {
            if (userInfo && userInfo._id) {
                await deletepost([userInfo._id, postIdToDelete]);
                setPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
                setOpenModal(false)
                setPostIdToDelete("")

            } else {
                console.log("User info is null or missing _id property.");
            }
        } catch (err) {
            console.log(err);
        }
    };
    // console.log(posts)
    return (
        <div className="table-auto overflow-x-scroll md:mx-auto my-10 px-4 sm:scrollbar-none   scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-700  w-full" >
            {userInfo.isAdmin && posts.length > 0 ? (
                <>
                    <Table hoverable>
                        <Table.Head className='shadow-md w-full'>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>Post image</Table.HeadCell>
                            <Table.HeadCell>Post title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {
                            posts.map((post) => (
                                <Table.Body className="divide-y items-center justify-center h-24" key={post._id}>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>  {new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>
                                            <Link to={`/post/${post.slug}`} >
                                                <img src={post.image} className=' w-24  h-full bg-gray-500 object-contain' loading='lazy' />
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link className='font-medium text-gray-900 dark:text-white'
                                                to={`/post/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {post.category}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span
                                                onClick={() => {
                                                    setOpenModal(true)
                                                    setPostIdToDelete(post._id);

                                                }}
                                                className='font-medium text-red-500 hover:underline cursor-pointer'
                                            >
                                                Delete
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Link
                                                className='text-teal-500 hover:underline'
                                                to={`/update-post/${post._id}`}
                                            >
                                                <span className='text-sm'>Edit</span>
                                            </Link>
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
                                    <Button color="failure" onClick={onClickDeletePostHandler}  >
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
                : !isLoading && posts.length == 0 ? (
                    <div className='flex justify-center items-center h-full text-xl font-semibold  '>There's no Posts right now</div>)
                    :
                    (
                        <div className='flex justify-center items-center h-full gap-2'>
                            <span>
                                <Spinner color="info" size='md' aria-label="Info spinner example" />
                            </span>
                            <span className='text-xl font-semibold'>
                                Loading...
                            </span>
                        </div>
                    )
            }
        </div >
    )
}
export default DashPosts