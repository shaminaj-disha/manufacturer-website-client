import { TrashIcon } from '@heroicons/react/solid';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import DeleteUserModal from './DeleteUserModal';

const ManageUsersRow = ({ user, refetch, index }) => {
    const { email, role } = user;
    const [deletion, setDeletion] = useState(null);
    const navigate = useNavigate();

    const makeAdmin = () => {

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
        <tr className="hover">
            <td>{index + 1}</td>
            <td>{email}</td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} className="btn btn-xs">Make Admin</button>}</td>
            <td><label onClick={() => setDeletion(user)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-ghost"><TrashIcon className='text-red-500' style={{ width: "20px" }}></TrashIcon></label></td>
            {deletion && <DeleteUserModal
                deletion={deletion}
                refetch={refetch}
                setDeletion={setDeletion}
            ></DeleteUserModal>}
        </tr>
    );
};

export default ManageUsersRow;