const axios = require('axios')
const AggregateError = require('aggregate-error')

module.exports = async (pluginConfig, context) => {
    const { env: { WEBHOOK_URL } } = context
    const { logger, nextRelease } = context

    let content = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Release Success",
        "sections": [
            {
                "markdown": false,
                "activityTitle": "Release Success",
                "activitySubtitle": "version "+nextRelease.version,
                "activityImage": "https://img.icons8.com/color/48/000000/ok.png",
            }
        ]
    }

    await axios.post(WEBHOOK_URL, content, {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }).then (res => {
        logger.log('Post to webhook success.')
    }).catch( err => {
        throw new AggregateError([err])
    })
}