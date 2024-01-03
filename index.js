const { GlobalKeyboardListener } = require("node-global-key-listener");
const keyboard = new GlobalKeyboardListener();
const ks = require("node-key-sender");
const logSingle = require("single-line-log").stdout;

// change which json you want to load here
const messages = require("./default.json");
const SINGLE_MODE_KEY = "LEFT ALT";

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

let singleMode = false;
let singleModeKey = "";

function printAllMessages(key) {
  const { name, msgs } = messages[key];

  logSingle(
    `=== ${name} ===
${msgs.reduce((str, cur, curIndex) => {
  return `${str}\n${curIndex} => ${cur}`;
}, "")}
======
`
  );
}

function printAllKeys() {
  logSingle(`=== LEGEND ===
${Object.keys(messages).reduce((str, key) => {
  const { msgs, name } = messages[key];
  const lastMessageIndex = -1;

  messages[key] = { name, msgs, lastMessageIndex };

  return `${str}\n${key} => ${name}`;
}, "")}
==============`);
}

printAllKeys();
keyboard.addListener(async function (e, down) {
  if (e.state === "UP") {
    if (e.name === SINGLE_MODE_KEY) {
      singleMode = !singleMode;
    } else {
      if (!messages[e.name] && !singleMode) return;

      const keyMessages = messages[e.name];

      if (down[SINGLE_MODE_KEY]) {
        printAllMessages(e.name);
        singleModeKey = e.name;
        return;
      }

      if (singleMode) {
        singleMode = false;

        const singleIndexMatch = e.name.match(/NUMPAD ([\d])/);

        const singleModeMessages = messages[singleModeKey];

        if (
          singleIndexMatch &&
          singleIndexMatch.length >= 2 &&
          singleModeMessages?.msgs &&
          Number(singleIndexMatch[1]) < singleModeMessages?.msgs?.length
        ) {
          console.log(singleModeMessages.msgs[Number(singleIndexMatch[1])]);
          chat(singleModeMessages.msgs[Number(singleIndexMatch[1])]);
        }

        printAllKeys();
        return;
      }

      logSingle(`Last Key Pressed: "${e.name}"`);

      if (keyMessages && !singleMode) {
        if (keyMessages.msgs.length > 1) {
          await chatRandom(e.name);
        } else {
          await chat(keyMessages.msgs[0]);
        }
      }
    }
  }
});
