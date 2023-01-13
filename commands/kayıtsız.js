const { MessageEmbed } = require('discord.js')
const config = require('../config.json');
const isimler = require('./isimler');
require("../structures/function")(client);

module.exports = {
    name: 'kayıtsız',
    aliases: ["kayıtsız", "unreg", "ks"],
    usage: ".kayıtsız @kullanıcı",
    run: async (client, message, args) => {
        const member = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[0]);

        if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(config.kayıt.kayıtYetkiliID)) return message.reply('<a:iptal:1063085914198388817> Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); })
        if (!member) return message.reply('<a:uyariemoji:1063085533556908042> Geçerli bir kullanıcı belirlemelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.roles.cache.has(config.kayıt.kayıtsızID)) return message.reply('<a:uyariemoji:1063085533556908042> Kullanıcı zaten kayıt edilmemiş!').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.id == message.member.id) return message.reply('<a:iptal:1063085914198388817> Kendinimi kayıt ediceksin?').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.bot) return message.reply('<a:iptal:1063085914198388817> Bot Arkadaşlarımı kayıt edemem!').then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        await member.roles.cache.has(config.kayıt.booster) ? member.roles.set([config.rol.booster, config.kayıt.kayıtsızID]) : member.roles.set([config.kayıt.kayıtsızID]).catch()

        let embed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RANDOM')
            .setDescription(`${member} adlı kullanıcı kayıtsıza atıldı! <a:tikk:1063085417945116742>`)
        message.reply({ embeds: [embed] })
    }
}