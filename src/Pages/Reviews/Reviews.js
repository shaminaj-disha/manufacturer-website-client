import React from 'react';
import StarRatings from 'react-star-ratings/build/star-ratings';

const Reviews = ({ reviews }) => {
    const { img, name, rating, review } = reviews;
    return (
        <div className="card card-compact lg:max-width-lg bg-base-100 shadow-xl shadow-primary">
            <figure><div className="avatar mt-8">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={img} alt='Reviewer Pic' />
                </div>
            </div></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}</h2>
                <div>Rating: <StarRatings
                    rating={parseInt(rating)}
                    starRatedColor="GoldenRod"
                    starDimension="20px"
                    starSpacing="5px"
                /><span className='ml-2'>({rating})</span></div>
                <p>Review: {review}</p>
            </div>
        </div>
    );
};

export default Reviews;