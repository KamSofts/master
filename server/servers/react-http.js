const http = require("http");
const users = require("../data/users.json");

let id = 11;

const server = http.createServer((req, res) => {
    // 1. Set global CORS headers for all incoming requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // 2. Handle the browser's preflight OPTIONS request
    if (req.method === "OPTIONS") {
        res.writeHead(204); // 204 No Content
        res.end();
        return;
    }

    if (req.url === "/users") {
        switch (req.method) {
            case "GET":
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(users));
                break;

            case "POST":
                let body = "";

                // Listen for incoming data stream chunks from fetch
                req.on("data", (chunk) => {
                    body += chunk.toString();
                });

                // Once all data chunks have arrived
                req.on("end", () => {
                    try {
                        const parsedData = JSON.parse(body);
                        console.log("Received Data :", parsedData);
                        const userObj = {id, ...parsedData};
                        console.log("Sending Data :", userObj);

                        // Always send a response back to resolve the fetch .then
                        res.writeHead(201, { 'content-type': 'application/json' });
                        res.end(JSON.stringify({ message: "User created", data: userObj }));
                        id++;
                    } catch (error) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: "Invalid JSON format" }));
                    }
                });
                break;

            default:
                res.writeHead(405, { 'Content-Type': 'text/plain' });
                res.end("Method Not Allowed");
                break;
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write("Not Found");
        res.end();
    }
});

server.listen(5000, () => console.log("Server is running http://localhost:5000/users"));