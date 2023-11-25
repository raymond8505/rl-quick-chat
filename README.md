# What?

Custom quick chats, either one chat per chosen key, or choose randomly from a set of similar chats

# How?

Install the package, change the messages and keys as needed. Uncomment the console log of `e.name` then run and press the key to find key codes.

## Scripts

- `start` runs the script in Node
- `dev` runs the script in nodemon so changes are reflected immediately on save.

## JSON Schema

Top level keys are the key name, values are array of messages to pick from

```json
{
  "<key name>": ["message 1", "message 2", "etc..."]
}
```
