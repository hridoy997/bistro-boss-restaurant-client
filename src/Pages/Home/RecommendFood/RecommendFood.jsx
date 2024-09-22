import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import OrderTab from '../../Order/OrderTab/OrderTab';

const RecommendFood = () => {
    const [menu] = useMenu();
    let selected = menu.sort(() => 0.5 - Math.random()).slice(0, 3);
    return (
        <div>
            <SectionTitle subHeading='Should Try' heading='CHEF RECOMMENDS'></SectionTitle>
            <OrderTab items={selected} showPrice={false}></OrderTab>
        </div>
    );
};

export default RecommendFood;
