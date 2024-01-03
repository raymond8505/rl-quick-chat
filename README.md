# What?

Custom quick chats, randomly send a quickchat from a group associated with a key, or send a specific one with `Single Mode`.

# How?

Install the package, change the messages and keys as needed. Uncomment the console log of `e.name` then run and press the key to find key codes.

`default.json` Contains my starter messages and keys, change as you please, or create other themed json files to use instead

## Scripts

- `start` runs the script in Node
- `dev` runs the script in nodemon so changes are reflected immediately on save.

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
