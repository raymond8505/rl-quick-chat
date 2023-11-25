const { GlobalKeyboardListener } = require("node-global-key-listener");
const keyboard = new GlobalKeyboardListener();
var ks = require("node-key-sender");
const messages = require("./default.json");

Object.keys(messages).forEach((key) => {
  const msgs = messages[key];
  const lastMessageIndex = -1;

  messages[key] = { msgs, lastMessageIndex };
});

const sendkeys = require("sendkeys");
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

//
async function chat(msg, public = true) {
  //console.log(msg);

  await sendkeys(public ? "t" : "y");
  await sleep(35);
  await sendkeys(msg);
  return ks.sendKey("enter");
}

function random(tot, except) {
  const i = Math.round(Math.random() * (tot - 1));

  return i === except ? random(tot, except) : i;
}

async function chatRandom(key) {
  const i = random(messages[key].msgs.length, messages[key].lastMessageIndex);
  messages[key].lastMessageIndex = i;
  chat(messages[key].msgs[i]);
}

const THIS_IS = [
  "This Is Diddy Kong Racing!",
  "This Is Cruisin' USA!",
  "Is This Rocket League?",
  "This Is Euro Truck Sim II!",
  "This Is Sparta!",
  "This Is Motor Kombat!",
  "This Is Team Sonic Racing!",
  "This Is GTA V!",
  "This Is The Rocket League Of Extraordinary Gentlemen!",
];

const EXCUSES = [
  "Sorry, my computer is haunted and the ghost is only Gold",
  "Sorry, I spilled beans on my controller",
];

const BUMPING = ["Rude!", "Ouch, my body!", "Kisses!", "I Need An Adult!"];

const POST_GAME = ["Gilmore Girls"];

const NICE_TRY = [
  "I see what you were trying to do there! You almost got it, I think. Keep trying!",
  "What a save! But, like in a sincere way. That was super close!",
];

keyboard.addListener(async function (e, down) {
  if (e.state === "UP") {
    const keyMessages = messages[e.name];

    if (keyMessages) {
      if (keyMessages.msgs.length > 1) {
        await chatRandom(e.name);
      } else {
        await chat(keyMessages.msgs[0]);
      }
    }
  }
});
