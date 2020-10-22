const axios = require('axios')
const AggregateError = require('aggregate-error')

module.exports = async (pluginConfig, context) => {
    const { env: { WEBHOOK_URL } } = context
    const { logger, nextRelease: { version, tag, notes } } = context

    let content = {
        "@type": "MessageCard",
        "@context": "https://schema.org/extensions",
        "title": "Release Fail",
        "sections": [
            {
                "markdown": false,
                "activityTitle": "Version: "+version,
                "activitySubtitle": "Tag: "+tag,
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