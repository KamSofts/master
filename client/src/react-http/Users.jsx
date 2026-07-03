import { useEffect, useRef, useState } from "react";
import "./Users.css";

const Users = () => {

    const [data, setData] = useState([]);
    const [emsg, setEmsg] = useState("");
    const refName = useRef();
    const refMail = useRef();
    const refWebsite = useRef();

    const cmdClear_Click = (e) => {
        e.preventDefault();
        setEmsg("");
        try {
            refName.current.value = "";
            refMail.current.value = "";
            refWebsite.current.value = "";
            refName.current.focus();
        } catch (error) {
            setEmsg(error.message);
        }
    }

    const cmdSave_Click = (e) => {
        e.preventDefault();
        setEmsg("");
        try {
            const name = refName.current.value + "".trim();
            const email = refMail.current.value + "".trim();
            const website = refWebsite.current.value + "".trim();

            if (!name || !email || !website) {
                setEmsg("Name, Email & Website required...!");
                return;
            }

            /* TODO...
            fetch("http://localhost:5000/users", {
                method: "POST",
                body: JSON.stringify({ name, email, website }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then((res) => console.log(res));
            */

        } catch (error) {
            setEmsg(error.message);
        }
    }

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    return (<>
        <h1>Users</h1>
        {emsg && <p>{emsg}</p>}
        <div>
            <div>
                <label htmlFor="txtName">Name : </label>
                <input type="text" name="txtName" id="txtName" ref={refName} />
            </div>
            <div>
                <label htmlFor="txtMail">Email : </label>
                <input type="text" name="txtMail" id="txtMail" ref={refMail} />
            </div>
            <div>
                <label htmlFor="txtWebsite">Website : </label>
                <input type="text" name="txtWebsite" id="txtWebsite" ref={refWebsite} />
            </div>
            <button onClick={cmdSave_Click} >Save</button>
            <button onClick={cmdClear_Click}>Clear</button>
        </div>

        <div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Eamil</th>
                        <th>Website</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(user =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.website}</td>
                            <td><button>...</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>);

};

export default Users;