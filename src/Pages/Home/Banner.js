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
                    <p className="py-6">Looking for some amazing tools? Here we have a huge collection of them. Every collection is brand new and comes with a reasonable price. So, don't worry and grab the tools you need right away.</p>
                    <PrimaryButton>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;