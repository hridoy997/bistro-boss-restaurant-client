import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {

    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { creacteUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        // console.log(data);
        creacteUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                // create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        console.log('user added database');
                        reset();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User Created Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    }
                })
            }).catch((error) => {
                console.log(error);
            });
        })
    };

    
    return (
        <>
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 md:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                            a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control" >
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: true })}
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control" >
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoURL", { required: true })}
                                    name="photoURL"
                                    placeholder="photo URL"
                                    className="input input-bordered"
                                />
                                {errors.photoURL && <span className="text-red-600">photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", { required: true, minLength:6, maxLength: 20, pattern:/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, })}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === "required" && ( <p className="text-red-600">Password is required</p> )}
                                {errors.password?.type === "minLength" && ( <p className="text-red-600">Password must be 6 chacacters</p> )}
                                {errors.password?.type === "maxLength" && ( <p className="text-red-600">Password must be less then 20 chacacters</p> )}
                                {errors.password?.type === "pattern" && ( <p className="text-red-600">Password must one upper case, one lower case, one number and one special chacacter</p> )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="SignUp" />
                            </div>
                        </form>
                        <p className="px-6"><small>Already have an account <Link to="/login">LogIn</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
