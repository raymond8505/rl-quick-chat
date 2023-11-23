const { GlobalKeyboardListener } = require("node-global-key-listener");
const keyboard = new GlobalKeyboardListener();
var ks = require("node-key-sender");

const sendkeys = require("sendkeys");
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//
async function chat(msg, public = true) {
  console.log(msg);
  await sendkeys(public ? "t" : "y");
  await sleep(35);
  await sendkeys(msg);
  return ks.sendKey("enter");
}

async function chatRandom(msgs) {
  chat(msgs[Math.round(Math.random() * (msgs.length - 1))]);
}

const THIS_IS = [
  "This Is Diddy Kong Racing!",
  "This Is Cruisin' USA!",
  "Is This Rocket League?",
  "This Is Euro Truck Sim II!",
  "This Is Sparta!",
  "This Is Motor Kombat!",
  "This Is Team Sonic Racing!",
];

const EXCUSES = [
  "Sorry, my computer is haunted and the ghost is only Gold",
  "I used to be Champ, but I took an arrow to the knee",
  "Sorry, I spilled beans on my controller",
];

const BUMPING = ["Rude!", "Ouch, my body!", "Kisses!"];

const POST_GAME = ["Gilmore Girls"];

const NICE_TRY = [
  "I see what you were trying to do there! You almost got it, I think. Keep trying!",
  "What a save! But, like in a sincere way. That was super close!",
];

keyboard.addListener(function (e, down) {
  if (e.state === "UP") {
    //console.log(e.name);
    switch (e.name) {
      case "NUMPAD 1":
        chatRandom(EXCUSES);
        break;
      case "NUMPAD 2":
        chatRandom(BUMPING);
        break;
      case "NUMPAD 3":
        chat("That's A Spicy Meat-A-Ball!");
        break;
      case "NUMPAD 4":
        chatRandom(POST_GAME);
        break;
      case "NUMPAD 5":
        chat("Don't Blame Me, I Was Getting Boost!");
        break;
      case "NUMPAD 6":
        chat("Cashew!");
        break;
      case "NUMPAD 7":
        chatRandom(NICE_TRY);
      case "NUMPAD 8":
        chatRandom(THIS_IS);
        break;
      //case "NUMPAD 9":
    }
  }
});
