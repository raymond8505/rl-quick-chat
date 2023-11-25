const { GlobalKeyboardListener } = require("node-global-key-listener");
const keyboard = new GlobalKeyboardListener();
var ks = require("node-key-sender");

// change which json you want to load here
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

keyboard.addListener(async function (e, down) {
  if (e.state === "UP") {
    const keyMessages = messages[e.name];
    //console.log(e.name);

    if (keyMessages) {
      if (keyMessages.msgs.length > 1) {
        await chatRandom(e.name);
      } else {
        await chat(keyMessages.msgs[0]);
      }
    }
  }
});
