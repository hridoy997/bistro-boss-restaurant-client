import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user.email],
        queryFn: async () => {
        const res = await axiosSecure.get(`/payments/${user.email}`);
        return res.data;
        },
    });

    const totalAmount = payments.reduce((total, item) => total + item.price, 0);

    return (
        <div>
        <SectionTitle
            heading="PAYMENT HISTORY"
            subHeading="At a Glance!"
        ></SectionTitle>
        <div className="flex justify-between">
            <h2 className="text-4xl">Total Payments: {payments.length}</h2>
            {/* <h2 className="text-4xl">Total Price: {totalAmount}</h2> */}
        </div>
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                    <th></th>
                    <th>Amount</th>
                    <th>Transaction Id</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment, index) => <tr key={payment._id}>
                        <th>{index + 1}</th>
                        <td>${payment.price}</td>
                        <td>{payment.transactionId}</td>
                        <td className="text-success">{payment.status}</td>
                    </tr>)}
                    
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default PaymentHistory;
