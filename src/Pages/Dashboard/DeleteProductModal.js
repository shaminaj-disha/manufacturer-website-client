import React from 'react';
import { toast } from 'react-toastify';

const DeleteProductModal = ({ deletion, refetch, setDeletion }) => {
    const { toolName, _id } = deletion;
    const handleDelete = () => {
        fetch(`https://whispering-plains-91117.herokuapp.com/tools/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`${toolName} is deleted.`)
                    setDeletion(null);
                    refetch();
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="manage-delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete {toolName}?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleDelete()} className="btn btn-xs btn-error">Delete</button>
                        <label htmlFor="manage-delete-confirm-modal" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteProductModal