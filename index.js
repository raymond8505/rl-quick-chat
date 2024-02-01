const { GlobalKeyboardListener } = require("node-global-key-listener");
const keyboard = new GlobalKeyboardListener();
const ks = require("node-key-sender");
const logSingle = require("single-line-log").stdout;
require("dotenv").config();

// change which json you want to load here
const rawMessages = require(process.env.MESSAGES_SRC);
const messages = new Map(Object.entries(rawMessages));
messages.forEach((msg) => (msg.previouslySent = []));

/**
 * convert messages into a Map
 * add array to each entry for used items so never repeat til all are used
 */
const SINGLE_MODE_KEY = "LEFT ALT";

const sendkeys = require("sendkeys");
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function chat(msg, public = true) {
  await sendkeys(public ? "t" : "y");
  await sleep(35);
  await sendkeys(msg);
  return ks.sendKey("enter");
}

function randomExcept(tot, except) {
  const i = Math.round(Math.random() * (tot - 1));

  return except.includes(i) ? randomExcept(tot, except) : i;
}

async function chatRandom(key) {
  const message = messages.get(key);

  if (!message) return;

  const { msgs, previouslySent } = message;
  const remainingMessages = msgs.filter((v, i) => {
    return !previouslySent.includes(v);
  });

  const i = Math.floor(Math.random() * remainingMessages.length);
  messages.get(key).previouslySent.push(remainingMessages[i]);

  chat(remainingMessages[i]);

  if (remainingMessages.length === 1) {
    messages.get(key).previouslySent = [];
  }
}

let singleMode = false;
let singleModeKey = "";

function printAllMessages(key) {
  try {
    const { name, msgs } = messages.get(key);

    logSingle(
      `=== ${name} ===
${msgs.reduce((str, cur, curIndex) => {
  return `${str}\n${curIndex} => ${cur}`;
}, "")}
======
`
    );
  } catch (e) {
    console.log(`->${key}<-`);
  }
}

function printAllKeys() {
  let keys = "";
  messages.forEach((value, key) => {
    keys = `${keys}\n${key} => ${value.name}`;
  });
  logSingle(`=== LEGEND ===${keys}
==============`);
}

printAllKeys();

keyboard.addListener(async function (e, down) {
  if (e.state === "UP") {
    if (e.name === SINGLE_MODE_KEY) {
      singleMode = !singleMode;
    } else {
      if (!messages.get(e.name) && !singleMode) return;

      const keyMessages = messages.get(e.name);

      if (down[SINGLE_MODE_KEY]) {
        printAllMessages(e.name);
        singleModeKey = e.name;
        return;
      }

      if (singleMode) {
        singleMode = false;

        const singleIndexMatch = e.name.match(/NUMPAD ([\d])/);

        const singleModeMessages = messages.get(singleModeKey);

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
