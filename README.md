# What?

Custom quick chats, randomly send a quickchat from a group associated with a key, or send a specific one with `Single Mode`.

# How?

Install the package, change the messages and names as needed.

## Scripts

- `start` runs the script in Node
- `dev` runs the script in nodemon so changes are reflected immediately on save.

## Install

1. Install the package
2. Copy `default.json`
3. Rename `.ENV copy` to `.ENV`
4. Open `.ENV` and change `MESSAGES_SRC` to point to your copy of `default.json`
5. Run `start` script

## Use

This is a pretty brute force solution, but it works so whatevs. The script listens for key presses globally and then sends keypresses in response. So when you do something that sends a chat it's as if you're physically pressing t then typing a message, just very fast, but not instant.

Because it's not instant I find sticking to messages you can send when you have a quick moment like

- Between goals!
- After getting demoed!
- When it's 7-0 and both your teammates are AFK, but neither will FF.
- Before kick off!

You know, standard Rocket League situations when time isn't important.

## Different Message Sources

The `.ENV` var `MESSAGES_SRC` points at the json file to use for the messages. Easily create multiple messages files and swap them by changing the path here. `default.json` contains a starter JSON for you.

## Single Mode

**Can only choose from the first 10 messages in a group, might add pagination eventually**

Holding left alt and pressing a message key will enter `Single Mode`. Release alt, the console will show all messages in the chosen group along with their index. The next numpad press will send the associated message
eg: alt+numpad 1 chooses the "sorry" group, release alt and press numpad 1 chooses the message at index 1.

## JSON Schema

Top level keys are the key name, values are array of messages to pick from

```json
{
  "<key name>": ["message 1", "message 2", "etc..."],
  "<key name>": ["message 3", "message 4", "etc..."]
}
```
