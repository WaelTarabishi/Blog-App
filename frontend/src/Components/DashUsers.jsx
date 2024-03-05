import { useSelector } from 'react-redux';
import { useGetusersMutation, useDeleteUserMutation, useGetmoreusersMutation } from '../Slices/authApiSlice';
import { useEffect, useState } from 'react';
import { Table, Button, Modal, Spinner } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';
const DashUsers = () => {
    const { userInfo } = useSelector(state => state.auth)
    const [showMore, setShowMore] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [users, setUsers] = useState([])
    const [getusers, { isLoading }] = useGetusersMutation()
    const [getmoreusers] = useGetmoreusersMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [userToDelete, setUserToDelete] = useState(null)
    const [usersNumber, setUsersNumber] = useState(0)
    const [loadShowMore, setLoadShowMore] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            if (!userInfo.isAdmin) {
                navigate("/dashboard?tab=profile")
            }
            const res = await getusers().unwrap()
            console.log(res)
            setUsersNumber(res.users.length)
            if (usersNumber < 9) {
                setShowMore(false)
            }
            // console.log(res)
            setUsers(res.users)
        }
        fetchUsers()
    }, [userInfo._id])
    const onClickDeleteUserHandle = async (e) => {
        e.preventDefault();
        try {
            // console.log("Initiating user deletion...");
            console.log("User to delete:", userToDelete);
            await deleteUser([userToDelete, userInfo._id]).unwrap();
            // console.log("User deleted successfully.");
            setUsers((prev) => prev.filter((user) => user._id !== userToDelete));
            setOpenModal(false);
            setUserToDelete("")
        } catch (err) {
            console.log(err)
        }
    };
    const showMoreHandle = async () => {
        setLoadShowMore(true)
        try {
            const res = await getmoreusers(usersNumber)
            setUsers(prev => [...prev, ...res.data])
            // console.log(res.data)
            if (res.data.length < 9) {
                setShowMore(false)
            }

        } catch (err) {
            console.log(err)
        }
    }
    // console.log(usersNumber)

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto my-10 px-4 sm:scrollbar-none   scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-700  w-full" >
            {userInfo.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable>
                        <Table.Head className='shadow-md w-full'>
                            <Table.HeadCell>Date updated</Table.HeadCell>
                            <Table.HeadCell>User image</Table.HeadCell>
                            <Table.HeadCell>UserName</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>

                        </Table.Head>
                        {
                            users.map((user) => (
                                <Table.Body className="divide-y items-center justify-center" key={user._id}>
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>  {new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                                        <Table.Cell>

                                            <LazyLoadImage src={user.profilePicture} className=' w-16 h-full bg-gray-500 object-contain rounded-full' />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className='font-medium text-gray-900 dark:text-white '>
                                                {user.username}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <span className='font-medium text-gray-900   dark:text-gray-400 '>
                                                {user.email}
                                            </span>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user.isAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user.isAdmin ? (<span></span>)
                                                : (
                                                    <span
                                                        onClick={() => {
                                                            setOpenModal(true)
                                                            setUserToDelete(user._id)
                                                        }}
                                                        className='font-medium text-red-500 hover:underline cursor-pointer'
                                                    >
                                                        Delete
                                                    </span>)
                                            }

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
                                    Are you sure you want to delete this user?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={(e) => { onClickDeleteUserHandle(e) }}  >
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
                        <button className=' w-full text-center text-blue-500 mt-2 cursor-pointer hover:text-blue-400' disabled={loadShowMore} onClick={showMoreHandle} >
                            {loadShowMore ? (<div className='flex justify-center items-center h-full gap-2'>
                                <span>
                                    <Spinner color="info" size='md' aria-label="Info spinner example" />
                                </span>
                                <span className='text-lg font-medium'>
                                    Loading...
                                </span>
                            </div>) : (<span>Show more</span>)}
                        </button>)}
                </>)
                : !isLoading && users.length == 0 ? (<div className='flex justify-center items-center h-full text-xl font-semibold  '>There's no Users right now</div>) :
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
export default DashUsers