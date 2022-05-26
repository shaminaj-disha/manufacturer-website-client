import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const DashboardHome = () => {
    const [user] = useAuthState(auth);
    const { data: users, isLoading } = useQuery('users', () => fetch(`https://whispering-plains-91117.herokuapp.com/profile/${user.email}`, {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem('accessToken');
            Navigate('/login');
        }
        return res.json();
    }))
    
    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='flex justify-center items-center mt-14'>
            <div className="card w-96 bg-base-100 shadow-xl shadow-primary">
                <div className="card-body">
                    <h1 className='text-3xl font-bold text-center underline text-accent'>Welcome</h1>
                    <h2 className="text-2xl font-bold text-center">{user?.displayName}</h2>
                    <h3 className='text-xl font-bold'>{user?.email}</h3>
                    <p className='font-bold'>{users?.education}</p>
                    <p className='font-bold'>{users?.address}</p>
                    <p className='font-bold'>{users?.phone}</p>
                    <p className='font-bold'>{users?.linkedIn}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;