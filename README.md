# What?

Custom quick chats, randomly send a quickchat from a group associated with a key, or send a specific one with `Single Mode`.

# How?

Install the package, change the messages and keys as needed. Uncomment the console log of `e.name` then run and press the key to find key codes.

`default.json` Contains my starter messages and keys, change as you please, or create other themed json files to use instead

## Use

This is a pretty brute force solution, but it works so whatevs. The script listens for key presses globally and then sends keypresses in response. So when you do something that sends a chat it's as if you're physically pressing t then typing a message, just very fast, but not instant.

Because it's not instant I find sticking to messages you can send when you have a quick moment like

- between goals
- after getting demoed\
- when it's 7-0 and both your teammates are AFK, but neither will FF
- before kick off.

You know, standard Rocket League situations when time isn't important.

## Scripts

- `start` runs the script in Node
- `dev` runs the script in nodemon so changes are reflected immediately on save.

## Install

1. Install the package
2. rename `.END copy` to `.ENV`
3. run `start` script

## Different Message Sources

The .ENV var `MESSAGES_SRC` points at the json file to use for the messages. Easily create multiple messages files and swap them by changing the path here. Default are whatever was in my own default.json file the last time I pushed here.

## Single Mode

**Can only choose from the first 10 messages in a group, might add pagination eventually**

Holding left alt and pressing a message key will enter `Single Mode`. Release alt, the console will show all messages in the chosen group along with their index. The next numpad press will send the associated message
eg: alt+numpad 1 chooses the "sorry" group, release alt and press numpad 1 chooses the message at index 1.

## JSON Schema

Top level keys are the key name, values are array of messages to pick from

```json
{
  "<key name>": ["message 1", "message 2", "etc..."]
}
```
