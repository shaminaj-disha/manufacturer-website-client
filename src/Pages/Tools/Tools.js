import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tools = ({tool}) => {
    const { _id, img, toolName, unitPrice, minimumQuantity, availableQuantity,  description } = tool;
    const navigate = useNavigate();
    const handleOrder = id =>{
        navigate(`/purchase/${id}`)
    }
    return (
        <div class="card card-compact lg:max-width-lg bg-base-100 shadow-xl">
            <figure><img src={img} alt="ZSingle Tool" /></figure>
            <div class="card-body">
                <h2 class="card-title">{toolName}</h2>
                <p>Minimum Order Quantity: {minimumQuantity}</p>
                <p>Available Quantity: {availableQuantity}</p>
                <p>price: {unitPrice}</p>
                <p>{description}</p>
                <div class="card-actions justify-end">
                    <button onClick={() => handleOrder(_id)} class="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Tools;