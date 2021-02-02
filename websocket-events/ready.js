const nodeHtmlToImage = require('node-html-to-image');
const discordDatabase = require('../discorddatabase')
const fetcher = require('../utils/templateFetcher')
const fs = require('fs');
const config = require('../../config.json');

var template = '';

var getModule = (async function(discordClient,channel,guild){
    var database = discordDatabase.getDatabase();
    discordClient.user.setActivity("GCODE File...",{type: "LISTENING"})
    
    if(typeof channel =="undefined"){
        for(var guildid in database){
            discordClient.guilds.fetch(guildid)
            .then(function(guild){
                var guilddatabase = database[guild.id]
                var theme = config.defaulttheme
                if(guilddatabase.theme!="default"){
                    theme=guilddatabase.theme
                }
                var broadcastchannels = guilddatabase.statuschannels
                for(var index in broadcastchannels){
                    var channel = guild.channels.cache.get(broadcastchannels[index]);
                    sendMessage(channel,theme)
                }
            })
            .catch(console.error);
        }
    }else{
        var guilddatabase = database[guild.id]
        var theme = config.defaulttheme
        if(guilddatabase.theme!="default"){
            theme=guilddatabase.theme
        }
        sendMessage(channel,theme)
    }
})

function sendMessage(channel,theme){
    readTemplateFile('./themes/'+theme+'/templates/ready.html',async function (err,templatefile){
        template=templatefile
        template = await fetcher.retrieveWebcam(template)
        template = await fetcher.retrieveOverlay(template,theme)
        template = await fetcher.retrieveKlipperVersion(template)
        var image = await nodeHtmlToImage({html:template})
        channel.send({
            files:[{
                attachment: image,
                name: 'ready.png'
            }]
        })
    });
}
module.exports = getModule;

function readTemplateFile(path, callback) {
    try {
        fs.readFile(path, 'utf8', callback);
    } catch (e) {
        callback(e);
    }
}