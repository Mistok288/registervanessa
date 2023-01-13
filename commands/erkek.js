const { MessageEmbed } = require('discord.js')
const config = require('../config.json')
const db = require('quick.db')
require("../structures/function")(client);

module.exports = {
    name: 'erkek',
    aliases: ["erkek", "e"],
    usage: ".erkek @kullanıcı isim yaş",
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('<a:uyariemoji:1063085533556908042> Geçerli bir kullanıcı belirtmelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        const member = message.mentions.users.size > 0 ? message.guild.members.cache.get(message.mentions.users.first().id) : message.guild.members.cache.get(args[0]);

        let name = args[1]
        let age = args[2]

        if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(config.kayıt.kayıtYetkiliID)) return message.reply('<a:iptal:1063085914198388817> Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); })
        if (!member) return message.reply('<a:uyariemoji:1063085533556908042> Geçerli bir kullanıcı belirlemelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (!name) return message.reply('<a:uyariemoji:1063085533556908042> Geçerli bir isim belirlemelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (!age) return message.reply('<a:uyariemoji:1063085533556908042> Geçerli bir yaş belirlemelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (isNaN(age)) return message.reply('<a:iptal:1063085914198388817> Yaş, geçerli rakamlarla girilmeli.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (!member.roles.cache.has(config.kayıt.kayıtsızID)) return message.reply('<a:iptal:1063085914198388817> Kullanıcının kayıtsız rolü yok.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        await member.setNickname(`${config.kayıt.tag} ${name} | ${age}`);
        await member.roles.add(config.kayıt.erkekID);
        await member.roles.remove(config.kayıt.kayıtsızID)

        let embed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('BLUE')
            .setDescription(`${member} adlı üye **Erkek** olarak kayıt oldu!`)

        message.react('<a:tikk1:1063085778885947432>')

        let kayit = {
            name: `${member.nickname}`,
            rol: "Erkek",
            yetkili: {
                name: `${message.member.nickname ? message.member.nickname : message.author.username}`,
                id: `${message.author.id}`
            }
        }
        if (!db.fetch(`isimler_${member.id}`)) await db.set(`isimler_${member.id}`, [])
        await db.push(`isimler_${member.id}`, kayit)
    }
}