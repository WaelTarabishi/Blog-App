import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetpostbyslugMutation, useGetpostsMutation } from '../Slices/authApiSlice';
import { Alert, Button, FileInput, Select, TextInput, Spinner } from 'flowbite-react';
import { CallToAction, CommentSection, PostCard } from '../Components';
const PostPage = () => {
    const [getpostbyslug, { isLoading, fulfilledTimeStamp, isSuccess }] = useGetpostbyslugMutation()
    const [getposts] = useGetpostsMutation()
    const [actualPost, setActualPost] = useState("")
    const [recentPosts, setRecentPosts] = useState([])
    const [limitnumber, setLimitNumber] = useState(3)
    const { postSlug } = useParams()
    useEffect(() => {
        const fetchPost = async () => {
            const res = await getpostbyslug(postSlug).unwrap()
            // console.log(res)
            setActualPost(res.posts[0])
        }
        fetchPost()
    }, [postSlug])
    useEffect(() => {
        try {
            const fetchRecentPosts = async () => {
                const res = await getposts(limitnumber).unwrap()
                // console.log(res, "this is recent")
                setRecentPosts(res.posts)
            }
            fetchRecentPosts()
        } catch (err) {
            console.log(err)
        }
    }, [])
    console.log(recentPosts)
    // console.log(actualPost._id)
    return (
        <div className=' '>
            {isLoading & !isSuccess ? (
                <div className='flex justify-center items-center h-screen gap-2'>
                    <span>
                        <Spinner color="info" size='md' aria-label="Info spinner example" />
                    </span>
                    <span className='text-xl font-semibold'>
                        Loading...
                    </span>
                </div>
            )
                :
                (
                    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen '>
                        <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
                            {actualPost && actualPost.title}
                        </h1>
                        <Link to={`/search?catergory=${actualPost && actualPost.category}`} className='self-center mt-5'>
                            <Button color='gray' pill size="xs" className='text-center pb-1'>{actualPost && actualPost.category}</Button>
                        </Link>
                        <img src={actualPost && actualPost.image} className=' mt-10 p-2 max-h-[600px] w-full object-cover border border-teal-500 rounded-md ' />
                        <div className='  flex justify-between p-3 border-b border-slate-500  mx-auto w-full max-w-2xl text-xs '>
                            <span>{new Date(actualPost && (actualPost.createdAt)).toLocaleDateString()}</span>
                            <span className='italic'>{actualPost && ((actualPost.content.length / 1000).toFixed(0))} mins read</span>
                        </div>
                        <div className='mx-auto w-full max-w-2xl p-2 post-content flex flex-wrap overflow-clip  ' dangerouslySetInnerHTML={{ __html: actualPost && (actualPost.content) }} />
                        <div className='max-w-4xl mx-auto w-full mt-6'><CallToAction /></div>
                        {fulfilledTimeStamp && (<CommentSection postId={actualPost && (actualPost._id)} />)}
                        <div className='flex flex-col  justify-center items-center mb-5'>
                            <h1 className='text-xl  mt-5'>Recent articales</h1>
                            <div className='flex  flex-wrap  items-center justify-center gap-5 '>
                                {recentPosts && recentPosts.map(post => (
                                    <PostCard key={post._id} post={post} />
                                ))}
                            </div>
                        </div>
                    </main>
                )
            }
        </div>
    )
}

export default PostPage