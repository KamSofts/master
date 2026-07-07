import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/home");
    }

    return (<>
        <h1>LOGIN PAGE</h1>
        <button onClick={handleSubmit} >Login</button>
    </>);
};

export default Login;