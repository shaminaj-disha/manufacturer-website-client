import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const Purchase = () => {
    const { register, formState: { errors }, reset, handleSubmit, getValues } = useForm();
    const { toolId } = useParams();
    const [user] = useAuthState(auth);
    const [item, setItem] = useState({});
    const [min, setMin] = useState();
    const minQuantity = item?.minimumQuantity;
    const orderQuantity = min;
    const maxQuantity = item?.availableQuantity;
    const navigate = useNavigate();
    let errorElement;

    useEffect(() => {
        const getTool = async () => {
            const url = `http://localhost:5000/tools/${toolId}`;
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setItem(data);
            }
            catch (error) {
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login')
                }
            }
        }
        getTool();
    }, [toolId, navigate, user]);

    if (orderQuantity < minQuantity) {
        errorElement = <small className='label-text-alt text-red-500'>Order quantity must be more than {minQuantity}</small>
    }
    else if (orderQuantity > maxQuantity) {
        errorElement = <small className='label-text-alt text-red-500'>Order quantity can not be more than {maxQuantity}</small>
    }
    else {
        errorElement = '';
    }

    const handleQuantity = quantityValue => {
        setMin(quantityValue);
    }

    const onSubmit = data => {
        const quantity = data.quantity;

        const purchase = {
            toolId: toolId,
            toolName: item?.toolName,
            unitPrice: item?.unitPrice,
            quantity: quantity ? quantity : (item?.minimumQuantity),
            totalPrice: ((item?.unitPrice) * (quantity ? quantity : (item?.minimumQuantity))),
            email: user?.email,
            name: user?.displayName,
            phone: data.phone,
            address: data.address
        }

        fetch('http://localhost:5000/purchase', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(purchase)
        })
            .then(result => result.json())
            .then(resultData => {
                if (resultData.success) {
                    toast.success(`Purchase order for ${item?.toolName} is successful.`);
                    reset();
                }
                else {
                    toast.error(`Purchase order for ${item?.toolName} is failed.`)
                }
            });
    };

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl m-28">
            <figure><img className='p-5' src={item?.img} alt="Album" /></figure>
            <div className="card-body">
                <h3 className="card-title text-xl font-bold justify-center">{item?.toolName}</h3>
                <p>Available Quantity: {item?.availableQuantity}</p>
                <p>Minimum Order Quantity: {item?.minimumQuantity}</p>
                <p>Per Unit Price: {item?.unitPrice}</p>
                <p className='mb-5'>{item?.description}</p>
                <h2 className="card-title justify-center">{user?.displayName}</h2>
                <h2 className="card-title justify-center mb-5">{user?.email}</h2>
                <h2 className="card-title justify-center my-5">Purchase Details</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-3 justify-items-center mt-2'>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Purchase Quantity</span>
                        </label>
                        <input type="number" placeholder={item?.minimumQuantity} className="input input-bordered w-full max-w-xs"  {...register("quantity")} onKeyUp={() => {
                            const quantityValue = getValues("quantity"); handleQuantity(quantityValue);
                        }} />
                        <label className="label">
                            {errorElement}
                        </label>
                    </div>
                    {/* <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs"  {...register("name")} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs"  {...register("email")} />
                    </div> */}
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
                            <span className="label-text">Address</span>
                        </label>
                        <textarea type="text" placeholder="Address" className="input input-bordered w-full max-w-xs"  {...register("address", {
                            required: {
                                value: true,
                                message: 'Address is Required'
                            }
                        })} />
                        <label className="label">
                            {errors.address?.type === 'required' && <span className="label-text-alt text-red-500">{errors.address.message}</span>}
                        </label>
                    </div>
                    {((orderQuantity < minQuantity) || (orderQuantity > maxQuantity)) ? <input className='btn btn-primary w-full max-w-xs uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary' type="submit" disabled value="Purchase" /> : <input className='btn btn-primary w-full max-w-xs uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary' type="submit" value="Purchase" />}
                </form>
            </div>
        </div>
    );
};

export default Purchase;