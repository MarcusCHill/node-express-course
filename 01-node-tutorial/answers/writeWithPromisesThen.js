const { writeFile, readFile } = require("fs").promises

writeFile('./content/temp.txt', `wrote line 1. `, { flag: 'a'})
.then(() => {
    return writeFile('./content/temp.txt', `then I wrote line 2. `, { flag: 'a'})
})
.then(() => {
    return writeFile('./content/temp.txt', `then I wrote line 3. `, { flag: 'a'})
})
.then(() => {
    return readFile('./content/temp.txt', 'utf-8')
})
.then((content) => {
    console.log(content)
})
.catch((err) => {
    console.log(err)
})