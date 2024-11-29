import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_NODE_URL } from '../../../config';

const OTPVerification = ({ onVerify, onCancel, mobile }) => {
    const [otp, setOtp] = useState('');
    const DEMO_OTP = '1234';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch(`${API_NODE_URL}otp/verify-otp`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ mobile, otp }),
            // });
            // const result = await response.json();
            // console.log(result);

            // if (result.success) {
            //     onVerify();
            // } else {
            //     throw new Error('Invalid OTP');
            // }
            if (otp === DEMO_OTP) {
                toast.success("OTP Verified")
                setTimeout(() => {
                    onVerify();
                }, 1500);
            } else {
                toast.error('Invalid OTP');
                throw new Error('Invalid OTP');
            }
        } catch (error) {
            console.log('OTP verification failed. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center ">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm transform transition-transform duration-300 scale-100 animate-scaleIn">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">OTP Verification</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            className="mt-1 block w-full py-1.5 px-3 border outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            placeholder="Enter the OTP sent to your mobile"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Verify
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer position="top-center" autoClose={1000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </div>
    );
};

export default OTPVerification;
