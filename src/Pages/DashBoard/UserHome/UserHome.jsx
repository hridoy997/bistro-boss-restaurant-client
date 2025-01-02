import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {

    const {user} = useAuth();

    return (
        <div>
            <h1 className="text-3xl">
                Hi, Welcome {
                    user?.displayName ? user.displayName : 'Back'
                }
            </h1>
        </div>
    );
};

export default UserHome;