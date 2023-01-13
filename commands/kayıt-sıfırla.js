const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const db = require('quick.db');
require("../structures/function")(client);

module.exports = {
    name: 'kayıt-sıfırla',
    aliases: ["kayıt-sıfırla", "teyit-sıfırla", "kreset"],
    usage: ".kayıt-sıfırla id",
    run: async (client, message, args) => {
        const id = message.mentions.users.size > 0 ? message.mentions.users.first().id : args[0]
        if (!id) return message.reply(`<a:iptal:1063085914198388817> Geçerli bir kullanıcı id'si girmelisin.`).then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(config.kayıt.kayıtYetkiliID)) return message.reply('<a:iptal:1063085914198388817> Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); })

        db.delete(`isimler_${id}`)
        let embed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RANDOM')
            .setDescription(`<@${id}> kullanıcısının kayıt verileri sistemden silindi! <a:tikk:1063085417945116742>`)

        message.reply({ embeds: [embed] })

    }
}