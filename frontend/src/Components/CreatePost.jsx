import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const CreatePost = () => {
    return (
        <div className='h-screen flex flex-col mx-auto itmes-center p-3 max-w-[1200px]'>
            <h1 className='text-center text-3xl my-7 font-semibold '>Create Post</h1>
            <form className='flex flex-col gap-4'>
                <div className='flex sm:flex-row flex-col justify-between  gap-4  '>
                    <TextInput type='text' placeholder='Title' className='flex-1 ' />
                    <Select className='flex-[0.7]'>
                        <option value="uncatergorized">Select a category</option>
                        <option value="javascript">JavaScript</option>
                        <option value="reactjs">ReactJs</option>
                        <option value="nextjs">NextJs</option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-2'>
                    <FileInput type="file" accept='image/*' />
                    <Button type='button' gradientDuoTone="greenToBlue" size='sm' outline>Upload image</Button>
                </div>
                <ReactQuill theme='snow' placeholder='Write something...' className='h-72  dark:text-white mb-12' required />
                <Button type='submit' gradientMonochrome="teal">Publish</Button>
            </form>
        </div>
    )
}

export default CreatePost