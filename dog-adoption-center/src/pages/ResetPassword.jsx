import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';

export default function ResetPassword() {
    const [data, setData] = useState({
        email: '',
        otp: '',
        newPassword: '',
    });
    const navigate = useNavigate();

    const resetPassword = async (e) => {
        e.preventDefault();
        try {
            const { data: responseData } = await axios.post('/resetPassword', data);
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                toast.success(responseData.message);
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='resetPasswordPage'>
            <div className='resetPasswordCard'>
                <h1>Reset Password</h1>
                <form onSubmit={resetPassword} className='resetPassswordForm'>
                    <label>Email</label>
                    <input type='email' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder='Enter your email' required />
                    <label>OTP</label>
                    <input type='text' value={data.otp} onChange={(e) => setData({ ...data, otp: e.target.value })} placeholder='Enter OTP'  required />
                    <label>New Password</label>
                    <input type='password' value={data.newPassword} onChange={(e) => setData({ ...data, newPassword: e.target.value })} placeholder='Enter new password'  required />
                    <button type='submit'>Reset Password</button>
                </form>
            </div>
        </div>
    );
}
