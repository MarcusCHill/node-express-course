const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('Welcome to our home pageeeee')
    }
    if(req.url === '/about'){
        res.end("Blah blah blah about about about")
    }
    res.end(`<h1>Oops! :0</h1>
        <p>We can't find what you are looking for :(</p>
        <a href="/">Go Home!</a>`)
})

server.listen(7290)