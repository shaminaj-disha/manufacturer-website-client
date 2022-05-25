import { TrashIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import DeleteUserModal from './DeleteUserModal';
// import ManageUsersRow from './ManageUsersRow';

const ManageUsers = () => {
    const [deletion, setDeletion] = useState(null);
    const navigate = useNavigate();
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }

    const makeAdmin = (email) => {

        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('Failed to Make an admin');
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`Successfully made an admin`);
                }

            })
    }

    return (
        <div>
            <h2 className="text-2xl my-4">All Users: {users.length}</h2>
            <div className="overflow-x-auto mx-4">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr className="hover" key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user?.email}</td>
                                <td>{user?.role !== 'admin' && <button onClick={() => makeAdmin(user?.email)} className="btn btn-xs">Make Admin</button>}</td>
                                <td><label onClick={() => setDeletion(user)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-ghost"><TrashIcon className='text-red-500' style={{ width: "20px" }}></TrashIcon></label></td>
                            </tr>)
                        }
                        {/* {
                            users?.map((user, index) => <ManageUsersRow
                                key={user._id}
                                user={user}
                                index={index}
                                refetch={refetch}
                            ></ManageUsersRow>)
                        } */}
                    </tbody>
                </table>
            </div>
            {deletion && <DeleteUserModal
                deletion={deletion}
                refetch={refetch}
                setDeletion={setDeletion}
            ></DeleteUserModal>}
        </div>
    );
};

export default ManageUsers;