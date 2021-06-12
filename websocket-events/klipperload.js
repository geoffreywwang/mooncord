const status = require('../utils/statusUtil')
const variables = require('../utils/variablesUtil')

const event = (message, connection, discordClient) => {
  if (message.type === 'utf8') {
    const messageJson = JSON.parse(message.utf8Data)
    if (typeof (messageJson.result) === 'undefined') { return }
    if (typeof (messageJson.result.status) === 'undefined') { return }

    const statusmessage = messageJson.result.status

    if (typeof (statusmessage.configfile) !== 'undefined') {
      loadMcu(statusmessage.configfile.config)
      return
    }
  }
}
function loadMcu(config) {
  console.log(config)
  console.log(JSON.fromEntries(JSON.entries(config).filter(([key]) => key.match(/(mcu)/g))))

}
module.exports = event
