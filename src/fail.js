const axios = require('axios')
const AggregateError = require('aggregate-error')

module.exports = async (pluginConfig, context) => {
    const { env: { WEBHOOK_URL } } = context
    const { logger, nextRelease: { version, gitTag, notes } } = context

    let content = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "summary": "Release Fail",
        "title": "Release Fail",
        "sections": [
            {
                "activityTitle": "Version: "+version,
                "activitySubtitle": "Tag: "+gitTag,
                "activityImage": "https://img.icons8.com/flat_round/48/000000/box-important.png",
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