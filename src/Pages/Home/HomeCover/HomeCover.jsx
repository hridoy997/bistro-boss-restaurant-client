import BgHeroImg from '../../../assets/home/chef-service.jpg'

const HomeCover = () => {
    return (
        <div className="relative flex items-center justify-center h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${BgHeroImg})` }}>
            <div className="flex flex-col justify-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg md:max-w-3xl  h-1/2 text-center">
                <h1 className="text-5xl font-bold mb-4">Bistro Boss</h1>
                <p className="text-base text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.
                </p>
            </div>
        </div>
    );
};

export default HomeCover;