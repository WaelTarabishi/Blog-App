import { Nextjs } from '../assets';
import { Button } from 'flowbite-react';
const CallToAction = () => {
    return (
        <div className="flex flex-col md:flex-row gap-5 max-w-6xl  rounded-tl-xl rounded-br-xl items-center  p-7 justify-center border border-teal-500">
            <div className='flex-[0.8] flex-col justify-center items-center text-center '>
                <h2 className='font-semibold text-2xl'>Boost Your Skills with Our Premium Courses</h2>
                <p className='text-gray-500 my-2'>Explore our wide range of expert-led courses to enhance your knowledge and advance your career.</p>
                <Button gradientDuoTone="greenToBlue" className='rounded-tl-xl rounded-bl-none mt-2 self-center w-full'>
                    <a href='' target='_blank' rel='noopener'>
                        Learn More
                    </a>
                </Button>
            </div>
            <div className='flex-[0.8] object-cover'><img src={Nextjs} alt="course" className='rounded-br-lg rounded-tl-lg' /></div>
        </div>
    )
}

export default CallToAction;

