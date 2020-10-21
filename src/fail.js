const axios = require('axios')

module.exports = async (pluginConfig, context) => {
    const { env: { WEBHOOK_URL } } = context
    const { logger } = context

    logger.log('webhookUrl: '+WEBHOOK_URL)
    if (WEBHOOK_URL) {
        axios({
            method: 'post',
            url: WEBHOOK_URL,
            'Content-type': 'application/json',
            data: `
            {
                "@type": "MessageCard",
                "@context": "https://schema.org/extensions",
                "summary": "Release Fail",
                "sections": [
                    {
                        "markdown": false,
                        "activityTitle": "Release Fail",
                        "activityImage": "https://img.icons8.com/flat_round/48/000000/box-important.png",
                    }
                ]
            },
            `
        })
    }
}