const eventEmitter = require("events")
//https://www.npmjs.com/package/prompt-sync
const prompt = require('prompt-sync')()

const emitter = new eventEmitter();

//Timer
emitter.on('timeLeft', (time) => {
    console.log(time)
})

emitter.on('timeBomb', (res) => {
    if(res.toLowerCase() === 'yes'){

        let time = 3

        const intervalID = setInterval(() =>{

            if (time <= 0){
                clearInterval(intervalID);
                console.log("BOOM!")
            } else {
                emitter.emit('timeLeft', time)
            }

            time--

        }, 1000)

    } else if (res.toLowerCase() === 'no'){

        console.log("Well then... May you have a blessed day.")

    } else {

        console.log("Are you trying to buy time by not giving me a proper answer?!?!")

    }
})

const askUser = async () => {
    try{
        const userAns = prompt(`Do you wish to cause destruction? ("yes" or "no") `, { autocomplete: complete(['yes', 'no'])})

        emitter.emit('timeBomb', userAns)
    } catch (err){
        console.log(err)
    }
}

askUser();

//Function to read autocomplete options by pressing tab
//Function created at //https://www.npmjs.com/package/prompt-sync
function complete(commands) {
    return function (str) {
      var i;
      var ret = [];
      for (i=0; i< commands.length; i++) {
        if (commands[i].indexOf(str) == 0)
          ret.push(commands[i]);
      }
      return ret;
    };
  };