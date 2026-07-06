const http = require("http");
const fs = require("fs");
const path = require("path");

// JSON data file
const dataPath = path.join(__dirname, "../data/users.json");

// Helper function to read the local JSON database file safely
function readUsers() {
    try {
        return JSON.parse(fs.readFileSync(dataPath, "utf8"));
    } catch {
        return [];
    }
}

const server = http.createServer((req, res) => {
    // 1. Set global CORS headers for all incoming requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 2. Handle the browser's preflight OPTIONS request
    if (req.method === "OPTIONS") {
        res.writeHead(204); // 204 No Content
        res.end();
        return;
    }

    // 3. Simple manual router for checking dynamic URLs (e.g., /users/1)
    const isExactUsersRoute = req.url === "/users";
    const isIdUsersRoute = req.url.startsWith("/users/");

    // Extract ID string if the URL format matches /users/something
    const userId = isIdUsersRoute ? Number(req.url.split("/")[2]) : null;

    // --- ROUTE: BASE /users ---
    if (isExactUsersRoute) {
        let users = readUsers();

        switch (req.method) {
            case "GET":
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users));
                break;

            case "POST":
                let body = "";
                req.on("data", chunk => body += chunk.toString());
                req.on("end", () => {
                    try {
                        const newUser = JSON.parse(body);
                        newUser.id = Date.now(); // Generate unique id and added to newUser object

                        users.push(newUser);
                        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

                        // Always send a response back to resolve the fetch .then
                        res.writeHead(201, { 'content-type': 'application/json' });
                        res.end(JSON.stringify({ message: "User created", data: users }));
                    } catch {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Invalid JSON format" }));
                    }
                });
                break;

            default:
                res.writeHead(405).end();
                break;
        }
    }
    // --- ROUTE: DYNAMIC /users/:id ---
    else if (isIdUsersRoute && userId) {
        let users = readUsers();
        const userIndex = users.findIndex(u => u.id === userId);

        // Check if the requested user even exists first
        if (userIndex < 0) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "User not found" }));
            return;
        }

        switch (req.method) {
            case "PUT":
                let body = "";
                req.on("data", chunk => body += chunk.toString());
                req.on("end", () => {
                    try {
                        const updatedUser = JSON.parse(body);
                        users[userIndex] = {
                            ...users[userIndex],
                            ...updatedUser,
                            id: users[userIndex].id
                        };
                        fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({ message: "User updated", data: users }));
                    } catch (err) {
                        console.log(err)
                        res.writeHead(400, { "Content-Type": "text/plain" });
                        res.end("Invalid JSON Body");
                    }
                });
                break;

            default:
                res.writeHead(405).end();
                break;
        }

    } else {
        res.writeHead(405).end();
    }
});

server.listen(5000, () => console.log("Server is running http://localhost:5000/users"));