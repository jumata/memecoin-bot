const EventEmitter = require('events');

class BotEventEmitter extends EventEmitter {}

const botEventEmitter = new BotEventEmitter();
module.exports = botEventEmitter;