import React from 'react';

const Blogs = ({ blog }) => {
    const { question, answer } = blog;
    return (
        <div className='m-5 p-5 border-solid border-2 border-sky-500 rounded-xl text-center'>
            <h2 className='py-5 font-bold text-xl'>{question}</h2>
            <p>{answer}</p>
        </div>
    );
};

export default Blogs;