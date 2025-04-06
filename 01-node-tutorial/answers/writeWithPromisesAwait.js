const { writeFile, readFile } = require("fs").promises

const writer = async() => {
    try{

        const written1 = await writeFile('./content/temp.txt', `wrote line 1. `, { flag: 'a'})
        const written2 = await writeFile('./content/temp.txt', `wrote line 2. `, { flag: 'a'})
        const written3 = await writeFile('./content/temp.txt', `wrote line 3. `, { flag: 'a'})

        //console.log(written1, written2, written3) //undefined because writeFile() does not return anything 

    } catch (error) {
        console.log(error)
    }
}

const reader = async() => {
    try{

        const readIt = await readFile('./content/temp.txt', `utf-8`)

        console.log(readIt) //should be temp.txt content

    } catch (error) {
        console.log(error)
    }
}

const readWrite = async() => {
    try{

        await writer();
        await reader();

    } catch (err){
        console.log(err)
    }
}

readWrite();