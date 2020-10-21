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
                "summary": "Release Success",
                "sections": [
                    {
                        "markdown": false,
                        "activityTitle": "Release Success",
                        "activitySubtitle": "",
                        "activityImage": "https://img.icons8.com/color/48/000000/ok.png",
                    }
                ]
            },
            `
        })
    }
}