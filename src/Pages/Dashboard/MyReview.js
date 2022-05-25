import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import axios from "axios";
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

const MyReview = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user] = useAuthState(auth);
    // const navigate = useNavigate();

    const imageStorageKey = process.env.REACT_APP_IMAGE_STORAGE_KEY;

    const onSubmit = data => {
        console.log('data', data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    console.log(img);
                    const review = {
                        img: img,
                        name: user?.displayName,
                        email: user?.email,
                        rating: data.rating,
                        review: data.review
                    }
                    console.log(review);
                    // send to your database

                    // fetch('http://localhost:5000/review', {
                    //     method: 'POST',
                    //     body: JSON.stringify(review)
                    // })
                    //     .then(result => result.json())
                    //     .then(resultData => {
                    //         if (resultData.success) {
                    //             toast.success('Review added successfully');
                    //             reset();
                    //         }
                    //         else {
                    //             toast.error('Failed to add the review')
                    //         }
                    //     });

                    const reviewUrl = `http://localhost:5000/review`;
                    // try {
                        const reviewData = axios.post(reviewUrl, review);
                        console.log(reviewData);
                        if (reviewData) {
                            toast.success('Review added successfully');
                            reset();
                        }
                        else {
                            toast.error('Failed to add the review');
                        }
                    // }
                    // catch (error) {
                    //     console.log(error.message);
                    //     if (error.response.status === 401 || error.response.status === 403) {
                    //         signOut(auth);
                    //         navigate('/login')
                    //     }
                    // }

                    // fetch('http://localhost:5000/review', {
                    //     method: 'POST',
                    //     body: JSON.stringify(review)
                    // })
                    //     .then(res => res.json())
                    //     .then(inserted => {
                    //         if (inserted.insertedId) {
                    //             toast.success('Review added successfully')
                    //             reset();
                    //         }
                    //         else {
                    //             toast.error('Failed to add the review');
                    //         }
                    //     })

                }

            })
        // console.log(data);
        // const url = `http://localhost:5000/reviews`;
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(result => {
        //         alert('Review Added Successfully');
        //         reset();
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    }
    return (
        <div className='flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Add a Review</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                        {/* <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" readOnly value={user?.displayName || ''} className="input input-bordered w-full max-w-xs"  {...register("name")} />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" readOnly value={user?.email || ''} className="input input-bordered w-full max-w-xs"  {...register("email")} />
                        </div> */}
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Rating</span>
                            </label>
                            <input type="number" placeholder="Your Rating" className="input input-bordered w-full max-w-xs"  {...register("rating", {
                                required: {
                                    value: true,
                                    message: 'Rating is Required'
                                },
                                max: {
                                    value: 5,
                                    message: 'Rating can not be more than 5'
                                },
                                min: {
                                    value: 1,
                                    message: 'Rating can not be less than 1'
                                }
                            })} />
                            <label className="label">
                                {errors.rating?.type === 'required' && <span className="label-text-alt text-red-500">{errors.rating.message}</span>} {errors.rating?.type === 'max' && <span className="label-text-alt text-red-500">{errors.rating.message}</span>} {errors.rating?.type === 'min' && <span className="label-text-alt text-red-500">{errors.rating.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Review</span>
                            </label>
                            <textarea type="text" placeholder="Your Review" className="input input-bordered w-full max-w-xs"  {...register("review", {
                                required: {
                                    value: true,
                                    message: 'Review is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="file"
                                {...register("image", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}
                            </label>
                        </div>
                        <input className='btn btn-primary w-full max-w-xs uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary' type="submit" value="Add Review" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyReview;