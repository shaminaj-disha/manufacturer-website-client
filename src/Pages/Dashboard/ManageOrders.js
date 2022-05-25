import { TrashIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';

const ManageOrders = () => {

    const [deletion, setDeletion] = useState(null);
    const navigate = useNavigate()
    const { data: orders, isLoading, refetch } = useQuery('orders', () => fetch(`http://localhost:5000/purchase`, {
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
                            <th>Cancel</th>
                            {/* <th>Payment</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <tr className="hover" key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order.email}</td>
                                <td>{order.toolName}</td>
                                <td>{order.quantity}</td>
                                <td>{order.unitPrice}</td>
                                <td>{order.totalPrice}</td>
                                <td><label onClick={() => setDeletion(order)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-ghost"><TrashIcon className='text-red-500' style={{ width: "20px" }}></TrashIcon></label></td>
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
            {deletion && <DeleteConfirmModal
                deletion={deletion}
                refetch={refetch}
                setDeletion={setDeletion}
            ></DeleteConfirmModal>}
        </div>
    );
};

export default ManageOrders;