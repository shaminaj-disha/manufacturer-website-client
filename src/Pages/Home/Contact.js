import React from "react";

const Contact = () => {
    return (
        <div className='bg-base-200 px-10 py-4 my-14 shadow-lg shadow-primary'>
            <div className='text-center pb-14 text-white'>
                <p className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent to-secondary'>
                    Contact Us
                </p>
            </div>
            <div className='grid grid-cols-1 justify-items-center gap-5'>
                <input
                    type='text'
                    placeholder='Email Address'
                    className='input input-bordered w-full max-w-md'
                />
                <input
                    type='text'
                    placeholder='Subject'
                    className='input input-bordered w-full max-w-md'
                />
                <textarea
                    className='textarea input-bordered w-full max-w-md'
                    placeholder='Your message'
                    rows={6}
                ></textarea>
                <button className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-accent">Submit</button>
            </div>
        </div>
    );
};

export default Contact;