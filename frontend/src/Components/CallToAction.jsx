import { js } from '../assets';
import { Button } from 'flowbite-react';
const CallToAction = () => {
    return (
        <div className="flex flex-col md:flex-row gap-5 rounded-tl-xl rounded-br-xl items-center  p-7 justify-center border border-teal-500">
            <div className='flex-[0.8] flex-col    justify-center items-center text-center '>

                <h2 className='font-semibold text-2xl'>Want to learn more about HTML,CSS and JavaScript by building fun and engaging projects?</h2>
                <p className='text-gray-500 my-2'>Checkout these resources with 100 JavaScript Projects</p>
                <Button gradientDuoTone="greenToBlue" className='rounded-tl-xl rounded-bl-none mt-2 self-center w-full ' >
                    <a href='https://www.100jsprojects.com' target='_blank' rel='noopener' >
                        Learn More
                    </a>
                </Button>
            </div>
            <div className='flex-[0.8] object-cover'><img src={js} alt="course" className='rounded-br-lg rounded-tl-lg ' /></div>
            <div></div>
        </div>
    )
}

export default CallToAction