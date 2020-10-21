const axios = require('axios')
const AggregateError = require('aggregate-error')

module.exports = async (pluginConfig, context) => {
    const { env: { WEBHOOK_URL } } = context
    const { logger, nextRelease } = context

    let content = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Release Fail",
        "sections": [
            {
                "markdown": false,
                "activityTitle": "Release Fail",
                "activitySubtitle": "version "+nextRelease.version,
                "activityImage": "https://img.icons8.com/flat_round/48/000000/box-important.png",
            }
        ]
    }

    await axios.post(WEBHOOK_URL, content, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }).then (res => {
        logger.log('Post to webhook with res: '+JSON.stringify(res))
    }).catch( err => {
        logger.log('Post to webhook with err: '+JSON.stringify(err))
        throw new AggregateError(err)
    })
}