import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
const ScrollToTop = ({ children }) => {
    const { path } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log('irendered')
    }, [path])

    return children
}

export default ScrollToTop