import axios from 'axios';
import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import auth from '../../firebase.init';

const AddProduct = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const [user] = useAuthState(auth);

    const imageStorageKey = process.env.REACT_APP_IMAGE_STORAGE_KEY;

    const onSubmit = data => {
        console.log('data', data);
        const image = data.img[0];
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
                    const tool = {
                        img: img,
                        toolName: data.toolName,
                        unitPrice: data.unitPrice,
                        minimumQuantity: data.minimumQuantity,
                        availableQuantity: data.availableQuantity,
                        description: data.description
                    }
                    console.log(tool);

                    const toolUrl = `http://localhost:5000/tools`;

                    const toolData = axios.post(toolUrl, tool);
                    console.log(toolData);
                    if (toolData) {
                        toast.success('Tool added successfully');
                        reset();
                    }
                    else {
                        toast.error('Failed to add the tool');
                    }

                }

            })

    }

    return (
        <div className='flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Add a Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Tool Name</span>
                            </label>
                            <input type="text" placeholder="Tool Name" className="input input-bordered w-full max-w-xs"  {...register("toolName", {
                                required: {
                                    value: true,
                                    message: 'Tool Name is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.toolName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.toolName.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Per Unit Price</span>
                            </label>
                            <textarea type="number" placeholder="Per Unit Price" className="input input-bordered w-full max-w-xs"  {...register("unitPrice", {
                                required: {
                                    value: true,
                                    message: 'Per Unit Price is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Minimum Quantity</span>
                            </label>
                            <textarea type="number" placeholder="Minimum Quantity" className="input input-bordered w-full max-w-xs"  {...register("minimumQuantity", {
                                required: {
                                    value: true,
                                    message: 'Minimum Quantity is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.minimumQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minimumQuantity.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Available Quantity</span>
                            </label>
                            <textarea type="number" placeholder="Available Quantity" className="input input-bordered w-full max-w-xs"  {...register("availableQuantity", {
                                required: {
                                    value: true,
                                    message: 'Available Quantity is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.review?.type === 'required' && <span className="label-text-alt text-red-500">{errors.review.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea type="text" placeholder="Tool Description" className="input input-bordered w-full max-w-xs"  {...register("description", {
                                required: {
                                    value: true,
                                    message: 'Description is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Tool Image</span>
                            </label>
                            <input type="file"
                                {...register("img", {
                                    required: {
                                        value: true,
                                        message: 'Image is Required'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.img?.type === 'required' && <span className="label-text-alt text-red-500">{errors.img.message}</span>}
                            </label>
                        </div>
                        <input className='btn btn-primary w-full max-w-xs uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary' type="submit" value="Add Review" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;