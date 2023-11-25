const { GlobalKeyboardListener } = require("node-global-key-listener");
const keyboard = new GlobalKeyboardListener();
const ks = require("node-key-sender");
const logSingle = require("single-line-log").stdout;

// change which json you want to load here
const messages = require("./default.json");

console.log("=== LEGEND ===");
Object.keys(messages).forEach((key) => {
  const { msgs, name } = messages[key];
  const lastMessageIndex = -1;

  messages[key] = { name, msgs, lastMessageIndex };

  console.log(key, "=>", name);
});
console.log("==============");

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
    logSingle(`Last Key Pressed: "${e.name}"`);

    if (keyMessages) {
      if (keyMessages.msgs.length > 1) {
        await chatRandom(e.name);
      } else {
        await chat(keyMessages.msgs[0]);
      }
    }
  }
});
