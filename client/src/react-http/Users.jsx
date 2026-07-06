import { useEffect, useRef, useState } from "react";
import "./Users.css";

const Users = () => {

    const base_url = "http://localhost:5000/users";

    const [data, setData] = useState([]);
    const [emsg, setEmsg] = useState("");
    const [editId, setEditId] = useState(0);
    const refName = useRef();
    const refMail = useRef();
    const refWebsite = useRef();

    function sbClear() {
        setEditId(0);
        refName.current.value = "";
        refMail.current.value = "";
        refWebsite.current.value = "";
        refName.current.focus();
    }

    const cmdClear_Click = (e) => {
        e.preventDefault();
        setEmsg("");
        try {
            sbClear();
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


            const u = editId <= 0 ? base_url : `${base_url}/${editId}`;
            const m = editId <= 0 ? "POST" : "PUT";
            fetch(u, {
                method: m,
                body: JSON.stringify({ name, email, website }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then((res) => {
                // 1. Check if the server response status is ok (200-299)
                if (!res.ok) {
                    throw new Error(`Server error: ${res.status}`);
                }
                return res.json(); // 2. Convert the stream to a readable JSON object
            }).then((serverData) => {
                // 3. This will now log: { message: "User created", data:[{...},{...}] }
                // console.log("Response from server:", serverData);
                // console.log("The actual user object:", serverData.data);
                sbClear();
                setData(serverData.data);
            }).catch((err) => {
                setEmsg(err.message);
            });
        } catch (error) {
            setEmsg(error.message);
        }
    }

    const cmdEdit_Click = (user) => {
        setEmsg("");
        setEditId(user.id);
        refName.current.value = user.name;
        refMail.current.value = user.email;
        refWebsite.current.value = user.website;
        refName.current.focus();
    }

    useEffect(() => {
        fetch(base_url)
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
                            <td><button onClick={() => cmdEdit_Click(user)}>...</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>);

};

export default Users;