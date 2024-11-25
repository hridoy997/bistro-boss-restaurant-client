import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";


//TODO: Add publishable key
const stripePromise = loadStripe('');
const Payment = () => {
    return (
        <div>
            <SectionTitle heading="Payment" subHeading="Please pay to eat"></SectionTitle>
            <h2>Pay.............!!</h2>
            <Elements stripe={stripePromise}>
                
            </Elements>
        </div>
    );
};

export default Payment;