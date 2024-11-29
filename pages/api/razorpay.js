export default async function handler(req, res) {
    const { PayID } = req.query;
    console.log(PayID);
    
    try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic cnpwX2xpdmVfQ0REazJLRUp3ekw2ajE6cUtvRTI5bDEwWUo5RzY0N3ByZmJIelA4");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(`https://api.razorpay.com/v1/payments/${PayID}`, requestOptions);
        const result = await response.json();
        console.log(result)
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching data from RazorPay API" });
    }
}