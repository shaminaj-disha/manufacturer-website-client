import React from 'react';
// import { toast } from 'react-toastify';

const UpdateConfirmModal = ({ status, refetch, setStatus }) => {
    const { toolName, _id } = status;
    const handleUpdate = () => {
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
                setStatus(null);
                refetch();
            })
    }
    return (
        <div>
            <input type="checkbox" id="update-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to update the status of {toolName}?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleUpdate()} className="btn btn-xs btn-error">Update</button>
                        <label htmlFor="update-confirm-modal" className="btn btn-xs">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UpdateConfirmModal;