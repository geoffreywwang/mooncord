const statusUtil = require('../utils/statusUtil')
const thumbnailUtil = require('../utils/thumbnailUtil')
const variables = require('../utils/variablesUtil')
const webcamUtil = require('../utils/webcamUtil')
const { discordClient } = require('../clients')

const getModule = async function (user) {
  discordClient.user.setActivity('Finished Print', { type: 'WATCHING' })

  const snapshot = await webcamUtil.retrieveWebcam()
  const thumbnail = await thumbnailUtil.retrieveThumbnail()

  const statusEmbed = statusUtil.getDefaultEmbed(user, 'Print Done', '#25db00')
  statusEmbed
    .setAuthor(variables.getCurrentFile())
    .addField('Print Time', variables.getFormatedPrintTime(), true)
    .attachFiles([snapshot, thumbnail])
    .setImage(`attachment://${snapshot.name}`)
    .setThumbnail(`attachment://${thumbnail.name}`)
  
  return statusEmbed
}
module.exports = getModule
