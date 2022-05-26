import React from 'react';
import conclusion from '../../images/tools/conclusion.png'
import PrimaryButton from '../Shared/PrimaryButton';

const Conclusion = () => {
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={conclusion} alt='' />
                    <div>
                        <h1 className="text-5xl font-bold">Hope You Enjoyed Our Tools!</h1>
                        <p className="py-6">If you liked our product then give us a thumbs up and give us a review! If you have any problem then contact us. Stay connected!</p>
                        <div className='flex w-50 justify-center space-x-8'><button className='btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-accent'>Review Us!</button><PrimaryButton>Contact Us!</PrimaryButton></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conclusion;