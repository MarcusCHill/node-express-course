const http = require('http')

//Cannot write after end. In my previous case I called res.end twice once through conditional and then after conditional is completed.

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('Welcome to our home pageeeee')
        //return
    } else if(req.url === '/about'){
        res.end("Blah blah blah about about about")
    } else {
        res.end(`<h1>Oops! :0</h1>
        <p>We can't find what you are looking for :(</p>
        <a href="/">Go Home!</a>`)
    }
})

server.listen(7290)