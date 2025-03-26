const { writeFile, readFile } = require("fs").promises

/*
The code the dream lesson has a comment that says 
"return the promise so you can chain the .then statements"
*/

//In my code below I did not return the promise in every .then statement

/*
My thought is that it is uneccesary to return the promise if it is not going to be used
and that the .then chain can exist without the previous .then statement having a return line

additionally, the writefile function does not provide a return value
*/

writeFile('./content/temp.txt', `wrote line 1. `, { flag: 'a'})
.then(() => {
    writeFile('./content/temp.txt', `then I wrote line 2. `, { flag: 'a'})
})
.then(() => {
    writeFile('./content/temp.txt', `then I wrote line 3. `, { flag: 'a'})
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