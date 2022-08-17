let http = require("http");
let url = require("url");

let routes = {
    GET: {
        "/": (req, res) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end("<h1>Get and / route</h1>");
        },
        "/home": (req, res) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end("<h1>Get and /home route</h1>");
        },
    },
    POST: {
        "/post": () => (req, res) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end("<h1>Post  and /post route</h1>");
        },
        "/comment": () => (req, res) => {
            res.writeHead(200, { "Content-type": "text/html" });
            res.end("<h1>Post  and /comment route</h1>");
        },
    },
    NA: (req, res) => {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>Route not found</h1>")
    }
}

// let start = (req, res) => {
//     routes[req.method][req.url]();

//     // res.end("method is " + req.method);
//     // res.end("url is " + req.url);
// }

let server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url);
    let resolveRoute = routes[req.method][urlObj.pathname];
    resolveRoute !== null && resolveRoute !== undefined ? resolveRoute(req, res) : routes.NA(req, res);

});

server.listen(3000, () => console.log('server is running at port 3000'));
