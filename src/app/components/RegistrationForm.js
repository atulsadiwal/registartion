'use client';

import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import OTPVerification from './OTPVerification';
import { API_NODE_URL } from '../../../config';
import useRazorpay from '../../../hooks/useRazorpay';

const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const [sid, setSid] = useState('');
    const [orderID, setOrderID] = useState('');
    const { triggerRazorpay } = useRazorpay();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        gender: '',
        sid: '',
        dob: '',
        city: '',
        collegeName: '',
        highestQualification: ''
    });
    let OrderDataNew;

    const handleStep1Submit = async (data) => {
        try {
            const response = await fetch(`${API_NODE_URL}register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();

            if (result?.data?.sid) {
                setFormData({ ...formData, ...data, sid: result?.data?.sid });
                setSid(result?.data?.sid);
                setShowOTPVerification(true);
            } else {
                throw new Error('SID not received');
            }
        } catch (error) {
            console.error('Error in step 1:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleOTPVerification = () => {
        setShowOTPVerification(false);
        setStep(2);
    };

    const handleOTPCancel = () => {
        setShowOTPVerification(false);
    };

    const handleStep2Submit = async (data) => {
        try {
            const finalData = { ...formData, ...data };
            const response = await fetch(`${API_NODE_URL}register/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });
            const result = await response.json();

            if (result?.status) {
                createOrder();
            } else {
                console.error('Registration failed!');
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error in registration:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const createOrder = async () => {
        const payload = {
            userid: sid,
            price: 1000
        }

        try {
            const response = await fetch(`${API_NODE_URL}order/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log(result);

            if (result.status) {
                OrderDataNew = result?.data.sid;
                setOrderID(result?.data);
                initiatePayment();
            }
        } catch (err) {
            console.error("Error :", err)
        }
    }

    const initiatePayment = async () => {
        try {
            const Payment = await triggerRazorpay(orderID)
            console.log(Payment);
            if (Payment) {
                console.log("step 3")
                GetDetails(Payment.razorpay_payment_id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const GetDetails = async () => {
        const Payment = "pay_PR5nrqeID0zQSQ";
        try {
            const response = await fetch(`/api/razorpay?PayID=${Payment}`);
            const data = await response.json();
            console.log(data);

            if (data) {
                await handleCreatePayment(data);
            }
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return false
        }
    };

    const handleCreatePayment = async (PayData) => {
        console.log(OrderDataNew);

        const payload = {
            userId: sid,
            participantId: sid,
            orderid: OrderDataNew,
            trans_date: Date.now(),
            paidAmount: PayData.amount,
            tracking_id: PayData.acquirer_data.rrn || "",
            bank_ref_no: "",
            order_status: PayData.status || "",
            failure_message: PayData.error_description || "",
            payment_mode: PayData.method || "",
            status_code: "200",
            status_message:
                PayData.status === "created" ? "Payment request initiated" :
                    PayData.status === "authorized" ? "Payment approved, pending capture." :
                        PayData.status === "captured" ? "Payment successfully processed" :
                            PayData.status === "refunded" ? "Payment reversed, refunded." :
                                PayData.status === "failed" ? "Payment attempt unsuccessful." : "",
            status: PayData.status || "",
            razorpayId: PayData.id || "",
            currency: PayData.currency || ""
        }

        console.log(payload);

        try {
            const response = await fetch(`${API_NODE_URL}payment/create`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(payload),
            });
            const responseData = await response.json();
            console.log(responseData)
            if (responseData?.status) {
                alert(responseData?.message);
            } else {
                alert(responseData?.message)
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="min-h-screen bg-mainSvg bg-cover flex items-center justify-center px-2 ">
            <div className='bg-gray-300 p-1 rounded-lg w-full max-w-md'>
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Registration</h1>
                    {step === 1 && (
                        <Step1 onSubmit={handleStep1Submit} />
                    )}
                    {step === 2 && (
                        <Step2 onSubmit={handleStep2Submit} />
                    )}
                    {showOTPVerification && (
                        <OTPVerification mobile={formData.mobile} onVerify={handleOTPVerification} onCancel={handleOTPCancel} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;

