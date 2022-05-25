import React from 'react';
import profile from '../../images/profile/profile.jpg';
import Footer from '../Shared/Footer';

const Portfolio = () => {
    return (
        <div>
            <div className='m-5 p-28 border-solid border-2 border-primary rounded-xl text-center'>
                <div className="avatar mb-14">
                    <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={profile} alt="" />
                    </div>
                </div>
                <h1 className='text-4xl font-bold mb-2'>Shaminaj Towfika Disha</h1>
                <h2 className='text-2xl mb-14'>stowfika88@gmail.com</h2>
                <h2 className='text-2xl font-bold mb-2'> Educational Background</h2>
                <h3 className='text-xl'>Ahsanullah University of Science and Technology</h3>
                <p>BSc in Computer Science and Engineering</p>
                <p className='mb-14'><small>(2015-2019)</small></p>
                <h2 className='text-2xl font-bold mb-2'>Skills</h2>
                <p><span className='font-bold'>Expertise:</span> React.js, JavaScript ES6, HTML, CSS, Bootstrap, Tailwind, C, C++, Java</p>
                <p><span className='font-bold'>Comfortable:</span> Node.js, Express.js, MongoDB, Context API, REST API, Browser APIs</p>
                <p><span className='font-bold'>Familiar:</span> MySQL, SQLite, SQL, Oracle, PHP, C\#, Python</p>
                <p className='mb-14'><span className='font-bold'>Tools:</span> Git, Github, VS Code, Chrome Dev Tool, Firebase, Heroku, Figma, Adobe Photoshop, Code::Blocks, NetBeans, Android Studio, MS Visual Studio, Anaconda, MATLAB</p>
                <h2 className='text-2xl font-bold mb-2'>Live Website Links</h2>
                <div className='flex flex-col'>
                    <button className='btn btn-link'><a href="https://warehouse-mangement-49044.web.app/" target="_blank" rel="noopener noreferrer">Warehouse Management</a></button>
                    <button className='btn btn-link'><a href="https://home-cook-delight.web.app/" target="_blank" rel="noopener noreferrer">Crazy Home Cook</a></button>
                    <button className='btn btn-link'><a href="https://zingy-salamander-7543ea.netlify.app/" target="_blank" rel="noopener noreferrer">Pet Shop</a></button>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Portfolio;