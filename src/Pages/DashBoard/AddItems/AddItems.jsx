import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosring_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosring_api = `https://api.imgbb.com/1/upload?key=${image_hosring_key}`;

const AddItems = () => {

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        // console.log(data);
        //image upload to imgbb and than get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosring_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if(res.data.success) {
            //now send the menu item data to the server with the image url
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            // console.log(menuRes.data);
            if(menuRes.data.insertedId){
                //show success popup
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log(res.data.data);
    };
    return (
        <div>
            <SectionTitle subHeading="What's new?" heading='ADD AN ITEM'></SectionTitle>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe name*</span>
                        </div>
                        <input {...register("name", {required: true})} type="text" placeholder="Recipe name" className="input input-bordered w-full" />
                    </label>

                    <div className='flex gap-6'>

                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Category name*</span>
                            </div>
                            <select defaultValue='default' {...register("category", {required: true})} className="select select-bordered w-full">
                                <option disabled value='default'  >Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>
                        
                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input {...register("price", {required: true})} type="number" step="any" placeholder="Price" className="input input-bordered w-full" />
                        </label>

                    </div>

                    {/* Recipe Ditails */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Recipe Ditails</span>
                        </div>
                        <textarea {...register('recipe', {required: true})}  className="textarea textarea-bordered h-24" placeholder="Recipe Ditails"></textarea>
                    </label>

                    <div className='form-control w-full my-6'>
                        <input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className='btn'>
                        Add Item
                        <FaUtensils className='ml-4'></FaUtensils>
                    </button>
                </form>
            </div>

        </div>
    );
};

export default AddItems;