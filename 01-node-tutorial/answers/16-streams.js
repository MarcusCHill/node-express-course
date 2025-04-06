//you must run node 15-create-big-file.js in the parent directory
//createReadStream accessed the created file (big.txt) in the content folder of the parent directory and not this directory.

const { createReadStream } = require('fs')

const stream = createReadStream('../content/big.txt', { highWaterMark: 100, encoding: 'utf8' })
let counter = 0

stream.on('data', (result) => {
    counter++
    console.log(result)
})
stream.on('end', () =>{
    console.log("chunks recieved: " + counter)
})
stream.on('error', (err) => console.log(err))


