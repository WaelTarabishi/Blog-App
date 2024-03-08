import { useParams } from 'react-router-dom';
import { useGetuserMutation, useGetusercommentsMutation } from '../Slices/authApiSlice';
import { useEffect, useState } from 'react';
import { Table, Spinner } from 'flowbite-react';
const UsersProfile = () => {
    const { userId } = useParams()
    const [getuser, { isLoading }] = useGetuserMutation()
    const [getusercomments] = useGetusercommentsMutation()
    const [user, setUser] = useState({})
    const [comments, setComments] = useState([])
    console.log(userId)
    const fetchUser = async () => {
        const res = await getuser(userId).unwrap()
        console.log(res)
        setUser(res)
    }
    const getuserComments = async () => {
        const res = await getusercomments(userId).unwrap()
        // console.log(res)
        setComments(res)
    }
    useEffect(() => {
        fetchUser()
        getuserComments()
    }, [userId])
    return (
        <>
            {isLoading ? (
                <div className='flex justify-center items-center  h-screen gap-2'>
                    <span>
                        <Spinner color="info" size='md' aria-label="Info spinner example" />
                    </span>
                    <span className='text-xl font-semibold'>
                        Loading...
                    </span>
                </div>) : (
                <div className='  mx-auto max-w-lg p-3 pt-28 w-full '>
                    <div className="flex flex-col gap-4 justify-center">
                        <h1 className=' text-center font-semibold text-3xl'>User Profile</h1>
                        <div className=" w-40 h-40 self-center shadow-xl mt-10 border-5 border-[lightgray] rounded-full overflow-hidden">
                            <img
                                className={`rounded-full object-cover w-full h-full border-2  `}
                                src={user.profilePicture}
                                alt='Profile Picture'

                            />
                        </div>

                        <div className='w-full  flex justify-center'>

                            {user._id === "65eb0faf1ab4aee7b6e165aa" ? (<span className='text-green-500 bg-black rounded-md p-1 text-xs w-11 flex items-center justify-center'>Admin</span>) : ("")}
                        </div>

                        <div className='flex flex-col justify-center items-center gap-3'>
                            <div className='flex flex-row gap-1 items-center justify-center '>
                                <span className='text-xl font-bold'>
                                    Username:
                                </span>
                                <span className='font-semibold text-lg text-gray-500'>
                                    {user.username}
                                </span>
                            </div>
                            <div className='flex flex-row gap-1 items-center justify-center '>
                                <span className='text-xl font-bold'>
                                    Email:
                                </span>
                                <span className='font-semibold text-lg text-gray-500'>
                                    {user.email}
                                </span>
                            </div>
                        </div>
                        <div className='mb-40 m-6'>
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
                    </div >
                </div >)}


        </>
    )
}

export default UsersProfile