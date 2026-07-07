import { useParams } from "react-router-dom";

const User = () => {
    const { id } = useParams();

    return (<>
        <h1>USER PROFILE PAGE</h1>
        <p>User ID is <b># {id}</b></p>
    </>);
};

export default User;