const FoodCard = ({ item , showPrice = true}) => {
    const { name, recipe, image, price } = item;
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
                    <button className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
