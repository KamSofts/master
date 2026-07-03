const express = require("express");
const cors = require("cors");

const users = require("../data/users.json");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/users", (req, res) => {
    return res.json(users);
});

app.listen(5000, () => console.log("Server is running http://localhost:5000/users"));