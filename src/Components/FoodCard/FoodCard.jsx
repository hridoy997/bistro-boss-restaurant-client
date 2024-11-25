import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";



const FoodCard = ({ item , showPrice = true}) => {

    const { name, recipe, image, price, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch ] = useCart();


    const handelAddToCart = food => {
        if(user && user.email) {
            // console.log(user.email, food);
            const cartItem = {
                manuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                // console.log(res.data);
                if(res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${name} Added to Your Cart`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // refetch cart to update the cart items count
                    refetch();
                }
            })
        }
        else {
            Swal.fire({
                title: "You Are Not Logged In",
                text: "Please Login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state: {from: location}});
                }
            });
        }
    }

    return (
        <div className="card  bg-base-100 w-96 shadow-xl my-5">
            <figure>
                <img src={image} alt="Shoes" className="w-full"/>
            </figure>
            {/* <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p> */}
            {showPrice && (
                <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            )}
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button 
                        onClick={() => handelAddToCart(item)}
                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;







