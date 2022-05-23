import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faGift } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    const today = new Date();
    const year = today.getFullYear();
    return (
        <div className='mt-12 bg-gradient-to-r from-secondary to-primary'>
            <footer className="p-10">
                <div className='footer'>
                    <div>
                        <span className="footer-title">Services</span>
                        <Link to="" className="link link-hover">Branding</Link>
                        <Link to="" className="link link-hover">Design</Link>
                        <Link to="" className="link link-hover">Marketing</Link>
                        <Link to="" className="link link-hover">Advertisement</Link>
                    </div>
                    <div>
                        <span className="footer-title">Company</span>
                        <Link to="" className="link link-hover">About us</Link>
                        <Link to="" className="link link-hover">Contact</Link>
                        <Link to="" className="link link-hover">Jobs</Link>
                        <Link to="" className="link link-hover">Press kit</Link>
                    </div>
                    <div>
                        <span className="footer-title">Legal</span>
                        <Link to="" className="link link-hover">Terms of use</Link>
                        <Link to="" className="link link-hover">Privacy policy</Link>
                        <Link to="" className="link link-hover">Cookie policy</Link>
                    </div>
                </div>
                <div className='my-10 text-center'>
                    <p>Copyright &copy; {year} - All right reserved</p>
                    <div className='flex justify-center items-center px-5 mt-2'>
                        <FontAwesomeIcon className='pr-2' icon={faCoffee} />
                        <FontAwesomeIcon className='pr-2' icon={faGift} />
                        <FontAwesomeIcon className='pr-2' icon={faStar} />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;