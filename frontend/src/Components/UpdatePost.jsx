import { useEffect, useState } from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useCreatepostMutation, useGetpostsMutation, useGetpostMutation } from '../Slices/authApiSlice';
import { app } from '../firebase';
import { HiInformationCircle } from 'react-icons/hi';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-circular-progressbar/dist/styles.css';
import 'react-quill/dist/quill.snow.css';
const UpdatePost = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)
    const { postId } = useParams()
    const [Error, setError] = useState('')
    const [createpost, { isLoading, isError, isSuccess }] = useCreatepostMutation()
    const [getposts] = useGetpostsMutation()
    const [getpost] = useGetpostMutation()

    const [file, setFile] = useState('')
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({})
    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError("Please select an image")
                return;
            }
            setImageUploadError(null)
            const storage = getStorage(app)
            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file)
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (file.size > maxSize) {
                setImageUploadError("Could not upload image(File must be less than 2MB)")
                return;
            }
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    setImageUploadError("Image Upload Error")
                    setImageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((donwlaodURL) => {
                        setImageUploadProgress(null)
                        setImageUploadError(null)
                        setFormData({ ...formData, image: donwlaodURL })
                    })
                }
            )
        } catch (err) {
            setImageUploadError('Image Upload Failed')
            setImageUploadProgress(null)
            console.log(err)
        }
    }
    const publishHandleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(formData).length === 0) { return }
        try {
            await createpost(formData).unwrap();
        } catch (err) {
            setError(err?.data?.message || err.error)
            console.log(err)
        }
    }
    useEffect(() => {
        try {
            const getPost = async () => {
                const res = await getpost(postId).unwrap()
                console.log(res)
                setFormData(...res.posts)
            }
            getPost()

        }
        catch (err) {
            console.log(err)
        }
    }, [])

    console.log(formData)
    return (
        <div className=' flex flex-col mx-auto itmes-center mb-28 p-3 max-w-[1000px]'>
            <h1 className='text-center text-3xl my-7 font-semibold '>Update Post</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex sm:flex-row flex-col justify-between  gap-4  '>
                    <TextInput type='text' placeholder='Title' className='flex-1 ' value={formData.title} onChange={(e) => { setFormData({ ...formData, title: e.target.value }) }} />
                    <Select className='flex-[0.7]' value={formData.category} onChange={(e) => { setFormData({ ...formData, category: e.target.value }) }}>
                        <option value="uncatergorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">ReactJs</option>
                        <option value="nextjs">NextJs</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-2'>
                    <FileInput type="file" accept='image/*' onChange={(e) => { setFile(e.target.files[0]) }} disabled={imageUploadProgress} />
                    <Button type='button' gradientDuoTone="greenToBlue" size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}  >{imageUploadProgress ? (
                        <div className='w-16 h-16'>
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                        </div>
                    ) : ("Upload Image")}</Button>
                </div>
                {imageUploadError && (<Alert icon={HiInformationCircle} color="failure">{imageUploadError}</Alert>)}
                {formData.image && (<img src={formData.image} alt='upload' className='w-full  h-[500px] object-cover'></img>)}
                <ReactQuill theme='snow' placeholder='' value={formData.content} className=' h-72  dark:text-white mb-12 p' required onChange={(value) => { setFormData({ ...formData, content: value }) }} />
                <Button type='submit' gradientMonochrome="teal" className='' onClick={publishHandleSubmit} disabled={isLoading || imageUploadProgress} >{isLoading ? "Loading..." : "Update"}</Button>
                {isError && (
                    <Alert className='mt-1 mb-6' icon={HiInformationCircle} color="failure">
                        {Error}
                    </Alert>
                )}
                {isSuccess && (
                    <Alert className='mt-1 mb-6' icon={HiInformationCircle} color="success">
                        Post is Published
                    </Alert>
                )}
            </form>
        </div>
    )

}
export default UpdatePost