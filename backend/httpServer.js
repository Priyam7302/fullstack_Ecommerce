// import path from 'path';
// import sum from './sum.js';
// // console.log("hello world");
// let a = 10;
// let b = 20;
// sum(a, b);
// console.log(path);
// import data from './data.js';
import http from 'http';
import data from './data.js';

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello, World!');
// });

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } else if (req.method === 'POST') {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            data.push(JSON.parse(body));
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data));
        });
    } else if (req.method === "PUT") {
        const idToEdit = Number(req.url.split("/")[1]);
        // console.log(idToEdit);
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const updated = data.map((obj) => (obj.id === idToEdit ? JSON.parse(body) : obj));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updated));
        })
    } else if (req.method === 'DELETE') {
        const idToDelete = Number(req.url.split("/")[1]);
        // console.log(idToDelete);
        const updated = data.filter((obj) => obj.id != idToDelete)
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(updated));
    }
});


server.listen(3000, () => console.log('Server running at 3000'));

