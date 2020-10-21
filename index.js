const verifyConditions = require('./src/verify')
const success = require('./src/success')
const fail = require('./src/fail')

let verified;

async function verify(pluginConfig, context) {
    await verifyConditions(pluginConfig, context);
    verified = true;
}

module.exports = { verify, success, fail }