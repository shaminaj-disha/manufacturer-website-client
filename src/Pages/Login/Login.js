import React, { useEffect } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import google from '../../images/social/google.png'

const Login = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit, getValues } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location?.state?.from?.pathname || "/";
    let signInError;

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    useEffect(() => {
        if (user || googleUser) {
            // console.log(user);
            navigate(from, { replace: true });
        }
    }, [user, googleUser, from, navigate]);

    if (loading || googleLoading || sending) {
        return <Loading></Loading>
    }

    if (error || googleError) {
        signInError = <p className='text-red-500'><small>{error?.message || googleError?.message}</small></p>
    }

    const onSubmit = data => {
        console.log(data)
        signInWithEmailAndPassword(data.email, data.password);
    };

    const resetPassword = async (emailValue) => {
        const email = emailValue;
        // const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email); // reset password using react firebase hooks
            toast.success('Sent email', {
                position: "top-right"
              }); // toast for reset 
        }
        else {
            toast.error('please enter your email address', {
                position: "top-right"
              }); // toast for when user don't put email in the input
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email" className="input input-bordered w-full max-w-xs"  {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is Required'
                                },
                                pattern: {
                                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: 'Provide a valid Email'
                                }
                            })} />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"  {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is Required'
                                },
                                minLength: {
                                    value: 6,
                                    message: 'Password must be 6 characters or longer'
                                }
                            })} />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        {signInError}
                        <input className='btn btn-primary w-full max-w-xs uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary' type="submit" value="Login" />
                    </form>
                    <p><small>New User? <Link className='text-primary' to="/register">Create New Account</Link></small></p>
                    <p><small>Forgot Password? <button className='btn btn-link text-primary no-underline' onClick={ ()=>{
                        const emailValue = getValues("email");resetPassword(emailValue);
                        }}>Reset Password</button></small></p>
                    <div className='divider'>OR</div>
                    <button onClick={() => signInWithGoogle()} className='btn btn-outline'><img style={{ width: '30px' }} src={google} alt="" /><span className='px-2'> Continue with Google</span></button>
                </div>
            </div>
        </div>
    );
};

export default Login;