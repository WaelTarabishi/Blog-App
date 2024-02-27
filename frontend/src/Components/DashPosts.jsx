import { useSelector } from 'react-redux';
import { useGetpostsMutation } from '../Slices/authApiSlice';
import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';
const DashPosts = () => {
    const { userInfo } = useSelector(state => state.auth)
    const [getposts, { isLoading }] = useGetpostsMutation()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getposts(userInfo._id).unwrap()
                setPosts(res.posts)

            } catch (err) {
                console.log(err)
            }
        }
        fetchPosts()
    }, [userInfo._id])
    console.log(posts)
    console.log(userInfo.isAdmin)
    console.log(posts.length)

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-700  w-full" >
            {userInfo.isAdmin && posts.length > 0 ? (<Table hoverable>
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
                        <Table.Body className="divide-y items-center justify-center ">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell>  {new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                <Table.Cell>
                                    <Link to={`/post/${post.slug}`} >
                                        <img src={post.image} className=' w-24  h-full bg-gray-500 object-contain' />
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
                                            setShowModal(true);
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
                                        <span>Edit</span>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))
                }

            </Table>) :
                (
                    <div>Loading</div>
                )}

        </div>
    )
}

export default DashPosts