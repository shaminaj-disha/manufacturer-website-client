import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
// import auth from '../../firebase.init';

const Dashboard = () => {
    // const [user] = useAuthState(auth);
    return (
        <div className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <h2 className='text-2xl font-bold text-primary mt-4'>Welcome to Dashboard</h2>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-primary text-base-content">
                    <li><Link to="/dashboard/profile">My Profile</Link></li>
                    {<>
                        <li><Link to="/dashboard/orders">My Orders</Link></li>
                        <li><Link to="/dashboard/review">My Reviews</Link></li>
                    </>}
                    {/* {<>
                        <li><Link to="/dashboard/manageOrders">Manage Orders</Link></li>
                        <li><Link to="/dashboard/addProduct">Add a Product</Link></li>
                        <li><Link to="/dashboard/manageUsers">Manage Users</Link></li>
                        <li><Link to="/dashboard/manageProducts">Manage Products</Link></li>
                    </>} */}
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;