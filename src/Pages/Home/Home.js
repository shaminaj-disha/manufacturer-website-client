import React, { useEffect, useState } from 'react';
import Footer from '../Shared/Footer';
import Loading from '../Shared/Loading';
import Tools from '../Tools/Tools';
import Reviews from '../Reviews/Reviews'

import Banner from './Banner';
import BusinessSummary from './BusinessSummary';

const Home = () => {
    const [tools, setTools] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isReviewLoading, setReviewLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => {
                setTools(data);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setReviewLoading(false);
            });
    }, []);

    const newTools = tools?.slice(-6);
    // const newReviews = reviews?.slice(-6);
    return (
        <div>
            <Banner></Banner>
            <div className='my-15'>
                <h3 className='text-center text-primary text-3xl font-bold uppercase mt-24'>Our Tools</h3>
            </div>
            {isLoading ? (<Loading></Loading>) : (<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-14 my-24'>
                {
                    newTools?.map(tool => <Tools
                        key={tool._id}
                        tool={tool}
                    ></Tools>)
                }
            </div>)}
            <div className='my-15'>
                <h3 className='text-center text-primary text-3xl font-bold uppercase mt-8'>Customer Reviews</h3>
            </div>
            {isReviewLoading ? (<Loading></Loading>) : (<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-14 my-24'>
                {
                    reviews?.map(review => <Reviews
                        key={review._id}
                        reviews={review}
                    ></Reviews>)
                }
            </div>)}
            <h3 className='text-center text-primary text-3xl font-bold uppercase mt-24 mb-16'>Business Summary</h3>
            <BusinessSummary></BusinessSummary>
            <Footer></Footer>
        </div>
    );
};

export default Home;