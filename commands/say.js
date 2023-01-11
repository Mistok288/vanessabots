const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'say',
    aliases: ['say'],
    run: async(client, message, args) => {
       /* const mapping = {
            " ": "",
            "0": "<a:0:794910823969587210>",
            "1": "<a:1:794910824048754700>",
            "2": "<a:2:794910824589426739>",
            "3": "<a:3:794910823863549952>",
            "4": "<a:4:794910823616348182>",
            "5": "<a:5:794910823695777802>",
            "6": "<a:6:794910852985126922>",
            "7": "<a:7:794910855258570752>",
            "8": "<a:8:794910855690059776>",
            "9": "<a:9:794910855346126849>",
        };*/
        var tag = '☆'//tagınızı yazınız
        var etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "0099").size;
        var toplamAile = message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.username.includes(tag) || member.user.discriminator == "0099").size;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var tag = message.guild.members.cache.filter(a => a.user.username.includes(tag)).size
       /* var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
        var emotag = `${tag}`.split("").map(c => mapping[c] || c).join("")
        var emoses = `${Sesli}`.split("").map(c => mapping[c] || c).join("")
        var emoetiket = `${etiket}`.split("").map(c => mapping[c] || c).join("")
        var emotoplam = `${toplamAile}`.split("").map(c => mapping[c] || c).join("")*/

        const embed = new MessageEmbed()
            .setColor('BLACK')
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))    
            .setDescription(`💎 • Sunucuda toplam **${toplamüye}** üye bulunmakta.
            💎• Sunucuda **${online}** aktif üye bulunmakta.
            💎 • Sunucuda toplam tagımızı alan **${tag}** üye bulunmakta.
            💎 • Sunucuda sesli sohbetlerde toplam **${Sesli}** üye bulunmakta`)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp()
            .setThumbnail(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setThumbnail(message.author.avatarURL)
            .setFooter('Lyrex was here')
        message.channel.send(embed)
    }
}