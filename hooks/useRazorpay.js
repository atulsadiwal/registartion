import { useRouter } from 'next/navigation';

const useRazorpay = () => {
    const router = useRouter();

    const loadRazorpayScript = () => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
            document.body.appendChild(script);
        });
    };

    const triggerRazorpay = (orderId) => {

        return new Promise(async (resolve, reject) => {
            try {
                const scriptLoaded = await loadRazorpayScript();
                if (!scriptLoaded) throw new Error('Razorpay SDK failed to load');

                const options = {
                    // key: 'rzp_live_CDDk2KEJwzL6j1',
                    // key: 'rzp_live_TkZqQPMTSvHVkb',
                    key: 'rzp_test_bJShg4py6mnQe0', // Test key
                    amount: 1 * 100,
                    // amount: amount.amount * 100,
                    currency: 'INR',
                    name: 'Federation Of Industrial Education',
                    description: 'The Federation of Industrial Education (FIE), founded in 2012, aims to enhance education quality by bridging the gap between industry and academia, empowering diverse educational sectors.',
                    order_id: orderId,
                    handler: function (response) {
                        resolve(response);  // Payment successful
                    },
                    modal: {
                        ondismiss: function () {
                            console.log('Popup closed by the user');
                            router.back();  // Go back when Razorpay popup is closed
                        },
                    },
                    prefill: {
                        name: 'Your Name',
                        email: 'youremail@example.com',
                        contact: '9999999999',
                    },
                    notes: {
                        address: 'Your Address',
                    },
                    theme: {
                        color: '#fff',
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();

                razorpay.on('payment.failed', function (response) {
                    console.error('Payment failed:', response.error);
                    reject(response.error);  // Reject if payment fails
                });
            } catch (error) {
                reject(error);  // Reject if any other error occurs
            }
        });
    };

    return { triggerRazorpay };
};

export default useRazorpay;
