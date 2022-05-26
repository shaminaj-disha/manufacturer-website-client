import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';
// import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PROMISE}`);

const Payment = () => {
    const { id } = useParams();
    const url = `https://whispering-plains-91117.herokuapp.com/purchase/${id}`;

    const { data: order, isLoading } = useQuery(['purchase', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='max-w-md mx-auto'>
            <div className="card w-50 max-w-md bg-base-100 shadow-2xl my-12">
                <div className="card-body">
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary">Hello, {order?.name}</p>
                    <h2 className="text-2xl font-bold">Please Pay for {order?.toolName}</h2>
                    <p>Order Quantity: <span className='text-orange-700'>{order?.quantity}</span></p>
                    <p>Per Unit Price: <span className='text-orange-700'>{order?.unitPrice}</span></p>
                    <p>Total Price: <span className='text-orange-700'>{order?.totalPrice}</span></p>
                    <p>Please pay: $<span className='text-orange-700'>{order?.totalPrice}</span></p>
                </div>
            </div>
            <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div className="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;