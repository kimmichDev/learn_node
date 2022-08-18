let http = require("http");
let url = require("url");
// let querystring = require(url.URLSearchParams);
require("dotenv").config();

let responder = (req, res, payload) => {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(payload);
}

let routes = {
    GET: {
        "/": (req, res) => {
            responder(req, res, `<h1>Get and / route</h1>`)
        },
        "/home": (req, res) => {
            responder(req, res, `<h1>Get and /home route</h1>`)
        },
    },
    POST: {
        "/post": (req, res) => {
            // responder(req, res, `<h1>Post and /post route</h1>`);
            let body = "";
            req.on("data", data => body += data);
            req.on("end", () => {
                let postParams = new URLSearchParams(body);
                // postParams.set("a", "b");
                console.log(postParams); //querystring.parse
                res.end();
            });
        },
        "/comment": (req, res) => {
            responder(req, res, `<h1>Post and /comment route</h1>`)
        },
    },
    NA: (req, res) => {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>Route not found</h1>")
    }
}

let server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true);
    let query = urlObj.query;
    let resolveRoute = routes[req.method][urlObj.pathname];
    resolveRoute !== null && resolveRoute !== undefined ? resolveRoute(req, res) : routes.NA(req, res);

});

server.listen(process.env.PORT, () => console.log("server is running at " + process.env.PORT));




// let start = (req, res) => {
//     routes[req.method][req.url]();

//     // res.end("method is " + req.method);
//     // res.end("url is " + req.url);
// }