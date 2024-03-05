import { Link } from "react-router-dom"
import { CallToAction, PostCard } from '../Components';
import { useGetpostsMutation } from '../Slices/authApiSlice';
import { useEffect, useState } from "react";
const Home = () => {
    const [getposts, { isLoading }] = useGetpostsMutation()
    const [posts, setposts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getposts().unwrap()
            console.log(res)
            setposts(res.posts)
        }
        fetchPosts()
    }, [])
    return (
        <div>
            <div className="flex flex-col gap-6 lg:p-28 p-10 max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold lg:text-6xl">Welcome To Dev's Blog</h1>
                <p className="text-gray-500 text-xs sm:text-sm">
                    Here you'll find a variety of articles and tutorials on topics such as web development,
                    software engineering, and programming languages.
                </p>
                <Link to='/search' className="text-xs sm:text-sm text-teal-500 font-semibold hover:underline">view all posts</Link>
            </div>
            <div className="p-3 ">
                <CallToAction />
            </div>
            <div className="w-full   flex flex-col  py-7 justify-center items-center  ">
                {posts && posts.length > 0 && (
                    <div className="flex flex-col gap-6 justify-center">
                        <h1 className="text-2xl font-semibold text-center py-5">Recent Posts</h1>
                        <div className="flex flex-wrap gap-4  justify-center">
                            {posts && posts.map((post) => (
                                < PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    </div>
                )}
                {posts.length !== 0 && <Link to='/search' className="mt-5 text-lg text-teal-500 hover:underline text-center">View all posts</Link>}
                {posts.length == 0 && isLoading && (
                    <div role="status" className="max-w-6xl p-4 border border-teal-500  rounded shadow animate-pulse md:p-6">
                        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                            </svg>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="flex items-center mt-4">

                            <div>
                                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                                <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                            </div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home