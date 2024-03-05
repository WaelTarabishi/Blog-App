import { useState } from 'react';

const useCache = () => {
    const [cache, setCache] = useState({});

    const setData = (key, data) => {
        setCache(prevCache => ({
            ...prevCache,
            [key]: data,
        }));
    };

    const getData = (key) => {
        return cache[key] || null;
    };

    return { setData, getData };
};

export default useCache;
