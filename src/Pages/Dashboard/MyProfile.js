import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MyProfile = () => {
    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const [user] = useAuthState(auth);

    const onSubmit = data => {

        const email = user?.email;

        const profile = {
            email: email,
            name: user?.displayName,
            phone: data.phone,
            linkedIn: data.linkedIn,
            education: data.education,
            address: data.address
        }
        console.log(profile);

        const profileData = axios.put(`http://localhost:5000/user/${email}`, profile);
        console.log(profileData);
        if (profileData) {
            toast.success('Profile added/ updated successfully');
            reset();
        }
        else {
            toast.error('Profile Failed');
        }

        // fetch(`http://localhost:5000/user/${email}`, {
        //     method: 'PUT',
        //     headers: {
        //         'content-type': 'application/json',
        //         authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //     },
        //     body: JSON.stringify(profile)
        // })
        //     .then(result => result.json())
        //     .then(resultData => {
        //         console.log(resultData);
        //         if (resultData) {
        //             toast.success(`Profile Added/ Updated.`);
        //             reset();
        //         }
        //         else {
        //             toast.error(`Profile failed.`)
        //         }
        //     });
    };

    return (
        <div className='flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">My Profile</h2>
                    <h2 className="text-xl text-center">Name: {user?.displayName}</h2>
                    <h2 className="text-xl text-center mb-4">Email: {user?.email}</h2>
                    <h2 className="text-2xl font-bold text-center">Add/ Update to Profile</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Education</span>
                            </label>
                            <textarea type="text" placeholder="Education Details" className="input input-bordered w-full max-w-xs"  {...register("education", {
                                required: {
                                    value: true,
                                    message: 'Education is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.education?.type === 'required' && <span className="label-text-alt text-red-500">{errors.education.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <textarea type="text" placeholder="Location" className="textarea input-bordered w-full max-w-xs"  {...register("address", {
                                required: {
                                    value: true,
                                    message: 'Address is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.address.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number" placeholder="Phone Number" className="input input-bordered w-full max-w-xs"  {...register("phone", {
                                required: {
                                    value: true,
                                    message: 'Phone is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Linked In</span>
                            </label>
                            <input type="text" placeholder="Linked In Profile" className="input input-bordered w-full max-w-xs"  {...register("linkedIn", {
                                required: {
                                    value: true,
                                    message: 'Phone is Required'
                                }
                            })} />
                            <label className="label">
                                {errors.linkedIn?.type === 'required' && <span className="label-text-alt text-red-500">{errors.linkedIn.message}</span>}
                            </label>
                        </div>
                        <input className='btn btn-primary w-full max-w-xs uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary' type="submit" value="Add / Update" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;