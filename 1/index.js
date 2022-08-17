let http = require("http");

let routes = {
    GET: {
        "/": () => console.log("method is GET and path is /"),
        "/home": () => console.log("method is GET and path is /home"),
    },
    POST: {
        "/post": () => console.log("method is POST and path is /post"),
        "/comment": () => console.log("method is GET and path is /comment"),
    }
}

let start = (req, res) => {
    routes[req.method][req.url]();

    // res.end("method is " + req.method);
    // res.end("url is " + req.url);
}

let server = http.createServer((req, res) => {
    routes[req.method][req.url]();

});

server.listen(3000, () => console.log('server is running at port 3000'));
