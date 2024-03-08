import { Button, Select, TextInput, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetpostsfromsearchtermMutation } from '../Slices/authApiSlice';
import { useNavigate } from 'react-router-dom';
import { PostCard } from '../Components';
const Search = () => {
    const navigate = useNavigate()
    const [sidebarData, setSideBarData] = useState({
        searchTerm: "",
        sort: "desc", // Set default sorting option
        category: "uncategorized", // Set default category option
    })
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])
    const [getpostsfromsearchterm, { isLoading }] = useGetpostsfromsearchtermMutation()
    const [showMore, setShowMore] = useState(false)
    const location = useLocation()
    const [postsNumber, setPostsNumber] = useState(0)
    const [loadShowMore, setLoadShowMore] = useState(false)


    useEffect(() => {
        setLoading(true)
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')

        if (searchTermFromUrl) {
            setSideBarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl
            })
        }
        const fetchPosts = async () => {
            const urlParams = new URLSearchParams(location.search)
            const searchQuery = urlParams.toString()
            console.log(searchQuery)
            const res = await getpostsfromsearchterm(searchQuery).unwrap()

            console.log(res)
            setPosts(res.posts)
            setPostsNumber(res.posts.length);
            if (res.posts.length < 9) {
                setShowMore(false);
            }
            setLoading(false)

        }
        fetchPosts()
    }, [location.search])
    // console.log(posts.length)
    // console.log(sidebarData)
    const handleChnage = (e) => {
        if (e.target.id === 'searchTerm') {
            setSideBarData({ ...sidebarData, searchTerm: e.target.value })
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc'
            setSideBarData({ ...sidebarData, sort: order })
        }
        if (e.target.id === 'catergory') {
            const category = e.target.value || 'uncategorized'
            setSideBarData({ ...sidebarData, category })
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('catergory', sidebarData.category)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
    console.log(posts, 'this is posts')
    // console.log(loading)
    const showMoreHandle = async () => {
        setLoadShowMore(true)
        try {
            const res = await getpostsmore(postsNumber)
            console.log(res.data.posts)
            setPosts((prev) => [...prev, ...res.data.posts]);
            if (res.data.posts.length < 9) {
                setShowMore(false);
            }
            setLoadShowMore(false)

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2 ">
                        <span className='whitespace-nowrap font-semibold'>
                            Search Term:
                        </span>
                        <TextInput placeholder='Seach...'
                            id="searchTerm"
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChnage}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <span className='whitespace-nowrap font-semibold'>Sort:</span>
                        <Select onChange={handleChnage} value={sidebarData.sort} id='sort'>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <span className='whitespace-nowrap font-semibold'>Gategory:</span>
                        <Select onChange={handleChnage} value={sidebarData.category} id='catergory'>
                            <option value='uncategorized'>Uncategorized</option>
                            <option value='nextjs'>Next.Js</option>
                            <option value='reactjs'>React.Js</option>
                            <option value='javaScript'>JavaScript</option>
                        </Select>
                    </div>
                    <Button type='submit' onClick={() => setLoading(true)}>Search</Button>
                </form>
            </div >
            <div className='w-full'>
                <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts resutls:</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts && posts.length > 0 ? (
                        <>
                            {posts.map(post => {
                                return (
                                    <PostCard key={post._id} post={post} />
                                )
                            })}
                            {showMore && (
                                <button className={`w-full text-center text-blue-500 mt-2 cursor-pointer hover:text-blue-400`} onClick={showMoreHandle} disabled={loadShowMore}  >
                                    {loadShowMore ? (<Spinner size="md" />) : (<span>Show more</span>)}
                                </button>
                            )}
                        </>
                    )
                        :
                        (!loading && posts.length == 0 ? (<div className='flex justify-center items-center h-full text-xl font-semibold  '>There's no Posts Like this</div>) : (
                            <div className='flex justify-center items-center h-screen w-full gap-2  '>
                                <span>
                                    <Spinner color="info" size='md' aria-label="Info spinner example" />
                                </span>
                                <span className='text-xl font-semibold'>
                                    Loading...
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div >
    )
}

export default Search;
