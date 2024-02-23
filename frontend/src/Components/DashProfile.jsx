import { Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { app } from '../firebase';
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useUpdateMutation } from '../Slices/userapiSlice';


const DashProfile = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [update, { isLoading, isError }] = useUpdateMutation()

    const [formData, setFormData] = useState({})
    const [Error, setError] = useState('')

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
        try {
            const res = await register({ username, email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
        } catch (err) {
            setError(err?.data?.message || err.error)
            console.log(Error)
        }
    }
    ///Handle change for inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    console.log(formData)

    return (
        <div className=' relative mx-auto max-w-lg p-3 w-full'>
            <form className="flex flex-col gap-4">
                <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
                <input className='hidden' type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} />
                <div className="relative w-40 h-40 self-center cursor-pointer shadow-xl mt-10 border-5 border-[lightgray] rounded-full overflow-hidden">
                    {imageFileUploadProgress && (
                        <CircularProgressbar value={imageFileUploadProgress || 0}
                            text={`${imageFileUploadProgress}%`}
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


                <TextInput type="text" id='username' placeholder='username' defaultValue={userInfo.name} onChange={handleChange} />
                <TextInput type="email" id='email' placeholder='email' defaultValue={userInfo.email} onChange={handleChange} />
                <TextInput type="password" id='password' placeholder='password' onChange={handleChange} />
                <Button gradientDuoTone="greenToBlue" type='submit' onClick={updateHandleSubmit} >Update</Button>
            </form >
            {isError && (
                <Alert icon={HiInformationCircle} color="failure">
                    {Error}
                </Alert>
            )}
            <div className='flex flex-row justify-between mt-2 text-red-600'>
                <div className='cursor-pointer'>Delete Account</div>
                <div className='cursor-pointer'>Sign Out</div>
            </div >
        </div >
    )
}

export default DashProfile