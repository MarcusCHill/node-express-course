const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let pokeType = "Did you know the pokemon Arceus can change types? Choose your favorite pokemon type!";
let types = ["Grass", "Fire", "Water", "Electric", "Psychic", "Figiting", "Dark", "Metal", "Normal"]

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="background-color:lightgrey">
  <form method="POST" style="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;">
  <label for="pokeType" style="color:black; font-size: 2rem;">${pokeType}</label>
  </br>
  <select id="pokeType" name="pokeType" style="width: 25vw; padding: 2rem;">
    ${types.map(type => `<option value=${type}>${type}</option>`).join('')}
  </select>
  </br>
  <button type="submit" style="width: 10vw; padding: 1rem;">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["pokeType"] !== "Normal") {
        res.writeHead(303, {'Content-Type': 'text/html'})
        res.end(`
          <body style="background-color:lightgrey">
            <div style="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;"> 
            <h1 style="font-size: 4rem;">${body["pokeType"]} Arceus</h1>
            <p style="font-size: 2rem;">${body["pokeType"]} Arceus occurs when you let Arceus hold a ${body["pokeType"]} type plate!</p>
            <a href="/" style="font-size: 1.5rem;">Return to form</a>
            </div>
          </body>
        `)
      } else if (body["pokeType"] === "Normal"){
        res.writeHead(303, {'Content-Type': 'text/html'})
        res.end(`
          <body style="background-color:lightgrey">
            <div style="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;">
            <h1 style="font-size: 4rem;">${body["pokeType"]} Arceus</h1>
            <p style="font-size: 2rem;">${body["pokeType"]} Arceus occurs natrually, without the need of a plate to decide its type!</p>
            <a href="/" style="font-size: 1.5rem;">Return to form</a>
            </div>
          </body>
        `)
      } else {
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.end(`
          <body style="background-color:lightgrey">
            <div style="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: space-around; align-items: center;">
            <h1 style="font-size: 4rem;">Oops!</h1>
            <p style="font-size: 2rem;">Something went wrong here!??!</p>
            <a href="/" style="font-size: 1.5rem;">Return to form</a>
            </div>
          </body>
        `)
      }
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");