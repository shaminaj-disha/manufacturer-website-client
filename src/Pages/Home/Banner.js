import React from 'react';
import PrimaryButton from '../Shared/PrimaryButton';
import tools from '../../images/tools/tools.png'

const Banner = () => {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={tools} className="max-w-sm" alt='' />
                <div className='pr-12'>
                    <h1 className="text-5xl font-bold">Find Your Tools Here</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;