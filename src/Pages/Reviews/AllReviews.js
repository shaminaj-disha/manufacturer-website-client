import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import Reviews from './Reviews';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className='my-15'>
                <h3 className='text-center text-primary text-3xl font-bold uppercase mt-14'>All Customer Reviews</h3>
            </div>
            {isLoading ? (<Loading></Loading>) : (<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-14 my-14'>
                {
                    reviews?.map(review => <Reviews
                        key={review._id}
                        reviews={review}
                    ></Reviews>)
                }
            </div>)}
        </div>
    );
};

export default AllReviews;