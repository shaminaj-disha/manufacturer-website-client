import { TrashIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
// import UpdateConfirmModal from './UpdateConfirmModal';

const ManageOrders = () => {

    const [deletion, setDeletion] = useState(null);
    // const [status, setStatus] = useState(null);
    const navigate = useNavigate()
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`https://whispering-plains-91117.herokuapp.com/purchase`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            navigate('/login');
        }
        return res.json();
    }))

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleUpdate = (_id, toolName) => {
        const payment = {
            order: _id,
            status: 'shipped',
        }
        fetch(`https://whispering-plains-91117.herokuapp.com/status/${_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(payment)
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success(`Order of ${toolName} is Shipped.`)
                // setStatus(null);
                refetch();
            })
    }

    return (
        <div>
            <h2 className='text-xl my-4'>All Orders: {orders.length}</h2>
            <div className="overflow-x-auto m-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Purchaser Email</th>
                            <th>Tool Name</th>
                            <th>Quantity</th>
                            <th>Per Unit Price</th>
                            <th>Total Price</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Cancel</th>
                            {/* <th>Payment</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <tr className="hover" key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order?.email}</td>
                                <td>{order?.toolName}</td>
                                <td>{order?.quantity}</td>
                                <td>{order?.unitPrice}</td>
                                <td>{order?.totalPrice}</td>
                                <td>
                                    {(!order?.paid) && <p><span className='text-red-500'>Unpaid</span></p>}
                                    {(order?.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                    </div>}
                                </td>
                                <td>
                                    {/* {(order?.paid && !order?.status) && <label onClick={() => setStatus(order)} htmlFor="update-confirm-modal" className="btn btn-xs btn-ghost"><button className='btn btn-xs bg-red-500'>Pending</button></label>} */}
                                    {(order?.paid && ((order?.status) === 'pending')) && <button onClick={() => handleUpdate(order?._id, order?.toolName)} className='btn btn-xs bg-red-500'>Pending</button>}
                                    {(order?.paid && ((order?.status) === 'shipped')) && <div>
                                        <p><span className='text-success'>Shipped</span></p>
                                    </div>}
                                </td>
                                <td>{(!order?.paid) && <label onClick={() => setDeletion(order)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-ghost"><TrashIcon className='text-red-500' style={{ width: "20px" }}></TrashIcon></label>}</td>
                                {/* <td>
                                    {(order.price && !order.paid) && <Link to={`/dashboard/payment/${order._id}`}><button className='btn btn-xs btn-success'>pay</button></Link>}
                                    {(order.price && order.paid) && <div>
                                        <p><span className='text-success'>Paid</span></p>
                                        <p>Transaction id: <span className='text-success'>{order.transactionId}</span></p>
                                    </div>}
                                </td> */}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* {status && <UpdateConfirmModal
                status={status}
                refetch={refetch}
                setStatus={setStatus}
            ></UpdateConfirmModal>} */}
            {deletion && <DeleteConfirmModal
                deletion={deletion}
                refetch={refetch}
                setDeletion={setDeletion}
            ></DeleteConfirmModal>}
        </div>
    );
};

export default ManageOrders;