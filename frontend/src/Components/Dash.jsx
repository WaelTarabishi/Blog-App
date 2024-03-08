import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetusersMutation, useGetpostsMutation, useGetallcommentsMutation } from '../Slices/authApiSlice';
import { HiArrowNarrowUp, HiOutlineUserGroup, HiAnnotation, HiDocumentText, HiArrowNarrowDown } from 'react-icons/hi';

import { Button, Table, Spinner } from 'flowbite-react';
const Dash = () => {
    const { userInfo } = useSelector(state => state.auth)
    const [getusers,] = useGetusersMutation()
    const [getposts] = useGetpostsMutation()
    const [getallcomments, { isLoading }] = useGetallcommentsMutation()
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [posts, setPosts] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [lastMonthUsers, setLastMonthUsers] = useState(0)
    const [lastMonthPosts, setLastMonthPosts] = useState(0)
    const [lastMonthComments, setLastMonthComments] = useState(0)
    const navigate = useNavigate()
    //fetching Users
    const fetchUsers = async () => {
        const res = await getusers().unwrap()
        // console.log(res)
        setUsers(res.users)
        setTotalUsers(res.totalUsers)
        setLastMonthUsers(res.lastMonthUsers)
    }
    const fetchPosts = async () => {
        const res = await getposts().unwrap()
        // console.log(res)
        setPosts(res.posts)
        setTotalPosts(res.totalPosts)
        setLastMonthPosts(res.lastMonthPosts)
    }
    const fetchComments = async () => {
        const res = await getallcomments().unwrap()
        // console.log(res)
        setComments(res.comments)
        setTotalComments(res.totalComments)
        setLastMonthComments(res.lastMonthComments)
    }
    useEffect(() => {
        if (!userInfo.isAdmin) {
            navigate("/dashboard?tab=profile")
        }
        fetchUsers()
        fetchPosts()
        fetchComments()
    }, [userInfo])
    console.log(users, totalUsers, lastMonthUsers)
    // console.log(posts, totalPosts, lastMonthPosts)
    // console.log(comments, totalComments, lastMonthComments)
    return (
        <>
            {isLoading ? (

                <div className='flex justify-center items-center w-full h-screen gap-2'>
                    <span>
                        <Spinner color="info" size='md' aria-label="Info spinner example" />
                    </span>
                    <span className='text-xl font-semibold'>
                        Loading...
                    </span>
                </div>
            )
                :
                (<div className='p-3 md:mx-auto  '>
                    <div className='flex flex-wrap gap-4 justify-center '>
                        <div className="'flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md  shadow-md '">
                            <div className='flex justify-between' >
                                <div className=''>
                                    <h3 className='text-gray-500 text-md uppercase'>Total Users</h3 >
                                    <p className='text-2xl'>{totalUsers}</p>
                                    <div className='flex gap-2 text-sm'>
                                        {lastMonthUsers === 0 ? (<span className='text-red-500 flex items-center '><HiArrowNarrowDown />0</span>) : (<><span className='text-green-500 flex items-center '><HiArrowNarrowUp />{lastMonthUsers}</span></>)}
                                        <div className='text-gray-500'>Last month</div>
                                    </div>
                                </div >
                                <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                            </div >
                        </div >

                        <div className="'flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md  shadow-md '">
                            <div className='flex justify-between' >
                                <div className=''>
                                    <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                                    <p className='text-2xl'>{totalComments}</p>
                                    <div className='flex gap-2 text-sm'>
                                        {lastMonthComments === 0 ? (<span className='text-red-500 flex items-center '><HiArrowNarrowDown />0</span>) : (<><span className='text-green-500 flex items-center '><HiArrowNarrowUp />{lastMonthComments}</span></>)}
                                        <div className='text-gray-500'>Last month</div>
                                    </div>
                                </div>
                                <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                            </div>
                        </div>

                        <div className="'flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md  shadow-md '">
                            <div className='flex justify-between' >
                                <div className=''>
                                    <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                                    <p className='text-2xl'>{totalPosts}</p>
                                    <div className='flex gap-2 text-sm'>
                                        {lastMonthPosts === 0 ? (<span className='text-red-500 flex items-center '><HiArrowNarrowDown />0</span>) : (<><span className='text-green-500 flex items-center '><HiArrowNarrowUp />{lastMonthPosts}</span></>)}
                                        <div className='text-gray-500'>Last month</div>
                                    </div>
                                </div>
                                <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                            </div>
                        </div>
                    </div >
                    <div className=' flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                        {/* Users tabel */}
                        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                            <div className='flex justify-between p-3 text-sm font-semibold'>
                                <h1 className='text-center p-2'>Recent Users</h1>
                                <Button outline gradientDuoTone="pinkToOrange">
                                    <Link to={`/dashboard?tab=users`}>
                                        See all
                                    </Link>
                                </Button>
                            </div>
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>User image</Table.HeadCell>
                                    <Table.HeadCell>User name</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className='divide-y' >
                                    {users && users.map((user) => (
                                        <Table.Row key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                                            <Table.Cell>
                                                <img src={user.profilePicture} alt="profilePicture" className='w-10 h-10 rounded-full bg-gray-500' />
                                            </Table.Cell>
                                            <Table.Cell>
                                                {user.username}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                        {/* Comments table */}
                        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                            <div className='flex justify-between p-3 text-sm font-semibold'>
                                <h1 className='text-center p-2'>Recent Comments</h1>
                                <Button outline gradientDuoTone="purpleToBlue">
                                    <Link to={`/dashboard?tab=comments`}>
                                        See all
                                    </Link>
                                </Button>
                            </div>
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Comment Content</Table.HeadCell>
                                    <Table.HeadCell>Likes</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className='divide-y' >
                                    {comments && comments.map((comment) => (
                                        <Table.Row key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                                            <Table.Cell className='w-96'>
                                                <p className='line-clamp-2'>
                                                    {comment.content}
                                                </p>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {comment.numberOfLikes}
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                        {/* Posts tabel */}
                        {posts ?
                            (<div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                                <div className='flex justify-between p-3 text-sm font-semibold'>
                                    <h1 className='text-center p-2'>Recent Posts</h1>
                                    <Button outline gradientDuoTone="tealToLime">
                                        <Link to={`/dashboard?tab=posts`}>
                                            See all
                                        </Link>
                                    </Button>
                                </div>
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>Post image</Table.HeadCell>
                                        <Table.HeadCell>Post Title</Table.HeadCell>
                                        <Table.HeadCell>Post Category</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className='divide-y' >
                                        {posts && posts.map((post) => (
                                            <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800 '>
                                                <Table.Cell>
                                                    <img src={post.image} alt="profilePicture" className='w-14 h-10 rounded-md bg-gray-500 object-cover' />
                                                </Table.Cell>
                                                <Table.Cell className='w-96'>
                                                    {post.title}
                                                </Table.Cell>
                                                <Table.Cell className='5'>
                                                    {post.category}
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>) : ("loading")}
                    </div>
                </div >)}

        </>
    )
}

export default Dash