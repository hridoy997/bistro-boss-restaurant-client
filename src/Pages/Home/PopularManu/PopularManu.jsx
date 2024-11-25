import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";


const PopularManu = () => {

    const [ menu ] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <section className="mb-12">
            <SectionTitle subHeading='Check it out' heading='FROM OUR MENU'></SectionTitle>

            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>

            <div className="flex justify-center items-center=">
                <Link to='/menu'>
                    <button className="btn btn-outline border-0 border-b-4 mt-4"> View Full Menu </button>
                </Link>
            </div>

        </section>
    );
};

export default PopularManu;