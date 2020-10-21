const AggregateError = require('aggregate-error')

module.exports = async(pluginConfig, context) => {
    const { logger, env: { WEBHOOK_URL } } = context;
    const errors = [];

    logger.log('verify required webhookUrl')
    if (!WEBHOOK_URL) {
        errors.push(new Error('WEBHOOK_URL is required.'))
    }

    if (errors.length > 0) {
        throw new AggregateError(errors);
        
    }
}