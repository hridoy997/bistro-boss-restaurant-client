import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Contact from "../Contact/Contact";
import Featured from "../Featured/Featured";
import HeroSection from "../HomeCover/HomeCover";
import PopularManu from "../PopularManu/PopularManu";
import RecommendFood from "../RecommendFood/RecommendFood";
import Testimonials from "../Testimonials/Testimonials";
import HomeCover from "../HomeCover/HomeCover";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <HomeCover></HomeCover>
            <PopularManu></PopularManu>
            <Contact></Contact>
            <RecommendFood></RecommendFood>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;