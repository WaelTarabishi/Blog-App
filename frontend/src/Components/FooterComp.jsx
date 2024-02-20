import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const FooterComp = () => {
    return (
        <Footer container className='border border-t-4 border-teal-500 md:mt-0 mt-8 '>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div className='md:mb-0  mb-3'>
                        <Link to='/' className=' whitespace-nowrap    text-xl  dark:text-white'>
                            <span className=' text-white bg-gradient-to-r from-cyan-500 to-blue-500   rounded-lg  px-2 py-1 text-center '>Dev's</span>
                            Blog
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <Footer.Title title="about" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>100 JS Projects</Footer.Link>
                                <Footer.Link as={"div"}>
                                    <Link to="/" >
                                        Dev's Blog
                                    </Link>
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Follow us" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="https://www.github.com/waeltarabishi">Github</Footer.Link>
                                <Footer.Link href="#">Discord</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title="Legal" />
                            <Footer.LinkGroup col>
                                <Footer.Link href="#">Privacy Policy</Footer.Link>
                                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <Footer.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <Footer.Copyright href="#" by="Dev™" year={2024} />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <Footer.Icon href="#" icon={BsFacebook} fill='red' />
                        <Footer.Icon href="#" icon={BsInstagram} />
                        <Footer.Icon href="#" icon={BsTwitter} />
                        <Footer.Icon href="#" icon={BsGithub} />
                    </div>
                </div>
            </div>
        </Footer >
    );
}
export default FooterComp