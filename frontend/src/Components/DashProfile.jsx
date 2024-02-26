import { Button, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '../firebase';
import { Alert } from 'flowbite-react';
import { HiInformationCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useUpdateMutation, useDeleteUserMutation, useLogoutMutation } from '../Slices/authApiSlice';
import { setCredentials, logout } from '../Slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const DashProfile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [update, { isLoading, isError, isSuccess }] = useUpdateMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [logOutApiCall] = useLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [Error, setError] = useState('')

    const [openModal, setOpenModal] = useState(false)

    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const filePickerRef = useRef()
    const handleImageChange = (e) => {


        const file = e.target.files[0]
        if (file) {
            setImageFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);


    const uploadImage = async () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (imageFile.size > maxSize) {
            setImageFileUploadError("Could not upload image (File must be less than 2MB)");
            setImageFileUrl(userInfo.profilePicture)
            return;
        }
        setImageFileUploadError(null)
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError("An error occurred while uploading the image.")
                setImageFileUploadProgress(null)
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL)
                    setFormData({ ...formData, profilePicture: downloadURL })
                });
            }
        );
    };
    const updateHandleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(formData).length === 0) { return }
        try {
            console.log(userInfo._id)
            const res = await update(formData, userInfo._id).unwrap();
            dispatch(setCredentials({ ...res }));
        } catch (err) {
            setError(err?.data?.message || err.error)
            console.log(err)
        }
    }
    ///Handle change for inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const onClickDeleteUserHandle = async (e) => {
        e.preventDefault()
        setOpenModal(false);
        try {
            const res = await deleteUser(userInfo._id).unwrap();
            dispatch(logout({ ...res }));
        } catch (err) {
            setError(err?.data?.message || err.error)
        }
    }
    const logoutHandleSubmit = async () => {
        try {
            await logOutApiCall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(err)

        }
    }

    // console.log(formData)
    // console.log(userInfo._id)

    return (
        <div className=' relative mx-auto max-w-lg p-3 w-full'>
            <form className="flex flex-col gap-4">
                <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
                <input className='hidden' type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} />
                <div className="relative w-40 h-40 self-center cursor-pointer shadow-xl mt-10 border-5 border-[lightgray] rounded-full overflow-hidden">
                    {imageFileUploadProgress && (
                        <CircularProgressbar value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress == 100 ? " " : imageFileUploadProgress + "%"}`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0
                                },
                                path: {
                                    stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`
                                }
                            }}
                        />
                    )}
                    <img
                        className={`rounded-full object-cover w-full h-full border-2  ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"} `}
                        src={imageFileUrl || userInfo.profilePicture}
                        alt='Profile Picture'
                        onClick={() => { filePickerRef.current.click() }}
                    />
                </div>
                {imageFileUploadError && (<Alert icon={HiInformationCircle} color="failure">{imageFileUploadError}</Alert>)}


                <TextInput type="text" id='username' placeholder='username' defaultValue={userInfo.name} onChange={handleChange} disabled={isLoading} />
                <TextInput type="email" id='email' placeholder='email' defaultValue={userInfo.email} onChange={handleChange} disabled={isLoading} />
                <TextInput type="password" id='password' placeholder='password' onChange={handleChange} disabled={isLoading} />
                <Button gradientDuoTone="greenToBlue" type='submit' onClick={updateHandleSubmit} disabled={isLoading} >{isLoading ? ("Loading... ") : ("Update")}</Button>
                {userInfo.isAdmin && (
                    <Link to={'/create-post'}>
                        <Button type='button' gradientDuoTone="pinkToOrange" className='w-full' >Create Post</Button>
                    </Link>
                )}
            </form >
            {isError && (
                <Alert className='mt-2' icon={HiInformationCircle} color="failure">
                    {Error}
                </Alert>
            )}
            {isSuccess && (
                <Alert className='mt-2' icon={HiInformationCircle} color="success">
                    User's profile updated successfully
                </Alert>
            )}
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this account?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={onClickDeleteUserHandle}  >
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <div className='flex flex-row justify-between mt-2 text-red-600'>
                <div className='cursor-pointer' onClick={() => { setOpenModal(true) }}>Delete Account</div>
                <div className='cursor-pointer' onClick={logoutHandleSubmit}>Sign Out</div>
            </div >
        </div >
    )
}

export default DashProfile