import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tools = ({tool}) => {
    const { _id, img, toolName, unitPrice, minimumQuantity, availableQuantity,  description } = tool;
    const navigate = useNavigate();
    const handleOrder = id =>{
        navigate(`/purchase/${id}`)
    }
    return (
        <div className="card card-compact lg:max-width-lg bg-base-100 shadow-xl shadow-primary">
            <figure><img className='h-24' src={img} alt="ZSingle Tool" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{toolName}</h2>
                <p>Minimum Order Quantity: {minimumQuantity}</p>
                <p>Available Quantity: {availableQuantity}</p>
                <p>price: {unitPrice}</p>
                <p>{description}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleOrder(_id)} className="btn btn-primary w-full max-w-xs uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Tools;