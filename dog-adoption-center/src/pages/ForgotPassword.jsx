import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const requestOTP = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/requestPasswordReset', { email },{ withCredentials: true });
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.message);
                navigate('/resetPassword');
            }
        } catch (error) {
            console.log("forgot",error);
        }
    };

    return (
        <div className='forgotPasswordPage'>
            <div className='forgotPasswordCard'>
                <h1>Forgot Password</h1>
                <form onSubmit={requestOTP} className='forgotPasswordForm'>
                    <label>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter registered email'required />
                    <button type='submit'>Request OTP</button>
                </form>
            </div>
        </div>
    );
}
