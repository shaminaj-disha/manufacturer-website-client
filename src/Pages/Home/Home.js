import React, { useEffect, useState } from 'react';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import Tools from '../Tools/Tools';

import Banner from './Banner';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            });
    }, []);
    const newItems = items?.slice(0, 6);
    return (
        <div>
            <Banner></Banner>
            <div className='my-28'>
                <h3 className='text-center text-primary text-xl font-bold uppercase'>Our Services</h3>
            </div>
            {isLoading ? (<Loading></Loading>) : (<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                {
                    newItems?.map(tool => <Tools
                        key={tool._id}
                        tool={tool}
                    ></Tools>)
                }
            </div>)}
            <Footer></Footer>
        </div>
    );
};

export default Home;