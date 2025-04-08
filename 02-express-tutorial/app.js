//1. The require statement to import the express module
const express = require('express')

const { products } = require("./data");

//2. Creation of the app as returned from calling express()
const app = express();
//3. app.use statements for the middleware. You’ll eventually use many kinds of middleware, but for now the only middleware we are using is express.static().
app.use(express.static("./public"))

//4. app.get and app.post statements for the routes you will handle. Eventually these will be refactored into router modules, but for now you can put them inline.
/*
app.post("Some Path", (request, response) => {
    response.???
})
*/
app.get("/api/v1/test", (request, response) => {
    response.json({ message: "I'm pretty sure this works!"})
})
app.get("/api/v1/products", (request, response) => {
    /*
    const myProducts = products.map((product) => {
        return product.name.charAt(0).toLocaleUpperCase() + product.name.slice(1) + ": $" + product.price
    })
    */
    response.json(products)
})
app.get("/api/v1/products/:productID", (request, response) => {
    const idToFind = parseInt(request.params.productID)
    const product = products.find((p) => p.id === idToFind)
    if (product){
        //response.json(product.name.charAt(0).toLocaleUpperCase() + product.name.slice(1) + ": $" + product.price)
        response.json(product)
    } else {
        response.status(404).send("Oops the product ID you are looking for is not found!")
    }
})
app.get("/api/v1/query", (request, response) => {
    const search = request.query.search
    const limit = request.query.limit
    const price = request.query.maxPrice
    let list = products;
    //if limit query does not exist the slice method will start at index 0 and end a undefined (the end of the array)

    //simpler conditionals
    if(search){
        list = list.filter((product) => product.name.startsWith(search))
    }
    if(price){
        list = list.filter((product) => {
            return product.price <= price
        })
    }
    return response.json(list.slice(0, limit))
    //if search and price query exist
    /*
    if (search && price){
        list = products.filter((product) => {
            return product.price <= price
        })
        list = list.filter((product) => product.name.startsWith(search))
        response.json(list.slice(0, limit))
    }
    //if search query exist and price query does not
    else if(search && !price){
        list = products.filter((product) => product.name.startsWith(search))
        response.json(list.slice(0, limit))
    }
    //if price query exist and seach query does not
    else if (!search && price){
        list = products.filter((product) => {
            return product.price <= price
        })
        response.json(list.slice(0, limit))
    }
    //if search and price query does not exist
    else{
        response.json(products.slice(0, limit))
    }
    */
})

//5. An app.all statement after these to handle page not found conditions.
app.all("*", (request, response) => {
    response.status(404).send("Oops this page does not exist!")
})

//6. An app.listen statement to tell the server to listen for requests on a particular port.
app.listen(3000, () => {
    console.log("I am listening on port 3000!")
})