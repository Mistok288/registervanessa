const config = require("../config.json")
const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
require("../structures/function")(client);

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        const kayıtsızRol = member.guild.roles.cache.find(role => role.id == config.kayıt.kayıtsızID)
        const kayıtsızNick = config.kayıt.kayıtsızNick == "" ? null : config.kayıt.kayıtsızNick
        if (kayıtsızNick) await member.setNickname(kayıtsızNick)
        await member.roles.add(kayıtsızRol)

        let kuruluş, zaman
        await client.kurulus(member).then(res => {
            kuruluş = res[0]
            zaman = res[1]
        })

        const kayıtChat = member.guild.channels.cache.find(channel => channel.id == config.kayıt.kayıtchatID)
        kayıtChat.send(`Vanessa'ya Hoş geldin ${member} biz de seni bekliyorduk, Hesabın ${kuruluş} tarihinde (**${zaman}** önce) kurulmuş!\n\n<a:konfeti:1063112826962575481> Sunucumuza Vanessa üyesinin daveti ile katıldın ve seninle birlikte ailemiz **${member.guild.memberCount}** kişi oldu!\n\n<a:yildiz1:1063084168344506468> Sunucu kurallarımız #kurallar kanalında belirtilmiştir. Unutma sunucu içerisindeki _ceza-i işlemler_ kuralları okuduğunu varsayarak gerçekleştirilecek.\n\n<a:yildiz2:1063084578601967667> Tagımıza Ulaşmak için herhangi bir kanala _.tag_ yazman yeterlidir. Şimdiden iyi eğlenceler.:tada::tada::tada:\n<@&${config.kayıt.kayıtYetkiliID}> rolündeki yetkililerimiz seninle ilgilenecektir.\n\n<a:welc:1062954224364814447><a:welc2:1062954226231296010>`)
    },
};