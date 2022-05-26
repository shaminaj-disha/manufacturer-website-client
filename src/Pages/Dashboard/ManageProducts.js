import { TrashIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteProductModal from './DeleteProductModal';

const ManageProducts = () => {
    const [deletion, setDeletion] = useState(null);
    const navigate = useNavigate()
    const { data: tools, isLoading, refetch } = useQuery('tools', () => fetch(`http://localhost:5000/tools`, {
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
            <h2 className='text-xl my-4'>All Products: {tools.length}</h2>
            <div className="overflow-x-auto m-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Tool Name</th>
                            <th>Per Unit Price</th>
                            <th>Minimum Order Quantity</th>
                            <th>Available Quantity</th>
                            <th>Delete</th>
                            {/* <th>Payment</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tools?.map((tool, index) => <tr className="hover" key={tool._id}>
                                <td>{index + 1}</td>
                                <td><img src={tool?.img} width="50px" alt="" /> </td>
                                <td>{tool?.toolName}</td>
                                <td>{tool?.unitPrice}</td>
                                <td>{tool?.minimumQuantity}</td>
                                <td>{tool?.availableQuantity}</td>
                                <td><label onClick={() => setDeletion(tool)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-ghost"><TrashIcon className='text-red-500' style={{ width: "20px" }}></TrashIcon></label></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {deletion && <DeleteProductModal
                deletion={deletion}
                refetch={refetch}
                setDeletion={setDeletion}
            ></DeleteProductModal>}
        </div>
    );
};

export default ManageProducts;