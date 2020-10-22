const axios = require('axios')
const AggregateError = require('aggregate-error')

module.exports = async (pluginConfig, context) => {
    const { env: { WEBHOOK_URL } } = context
    const { logger, nextRelease: { version, gitTag, notes } } = context

    let content = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Release Success",
        "sections": [
            {
                "markdown": false,
                "activityTitle": "Version: "+version,
                "activitySubtitle": "Tag: "+gitTag,
                "activityImage": "https://img.icons8.com/color/48/000000/ok.png",
                "text": notes
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