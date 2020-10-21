const AggregateError = require('aggregate-error')

module.exports = async(pluginConfig, context) => {
    const { logger, env: { WEBHOOK_URL } } = context;
    const errors = [];

    if (!WEBHOOK_URL) {
        logger.log('verify required webhookUrl failed')
        errors.push(new Error('WEBHOOK_URL is required.'))
    }

    if (errors.length > 0) {
        throw new AggregateError(errors);

    }
}