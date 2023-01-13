const { MessageEmbed } = require('discord.js');
const config = require('../config.json')
const db = require('quick.db')
require("../structures/function")(client);

module.exports = {
    name: 'isimler',
    aliases: ["isimler"],
    usage: ".isimler id",
    run: async (client, message, args) => {
        const id = message.mentions.users.size > 0 ? message.mentions.users.first().id : args[0]    
                  if (!message.member.roles.cache.has(config.kayıt.kayıtYetkiliID) && !message.member.permissions.has(config.kayıt.kayıtYetkiliID)) return message.reply('<a:iptal:1063085914198388817> Bu komutu kullanabilmek için gerekli izinlere sahip değilsin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); })
        if (!id) return message.reply(`<a:uyariemoji:1063085533556908042> Geçerli bir kullanıcı id'si girmelisin.`).then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        let description
        let isimler = db.fetch(`isimler_${id}`)
        if (!isimler) description = `${config.emoji.amblem} <@${id}> adlı kişinin son 10 kayıt geçmişi\n\n<a:konfeti:1063112826962575481>  **[0]** adet verisi bulundu.\n\nKayıt verisi bulunamadı.`
        else {
            description = `${config.emoji.amblem} <@${id}> adlı kişinin son 10 isim geçmişi\n\n<a:konfeti:1063112826962575481>  **[${isimler.length}]** adet isim kaydı bulundu.\n\n`
            let i = isimler.length;
            if (isimler.length > 10) i = 10
            let x = 0
            while (i >= 1) {
                description += `**${isimler[x].name}** (\`${isimler[x].rol} Üye\`) (**Yetkili:** <@${isimler[x].yetkili.id}> (\`${isimler[x].yetkili.name}\`))\n`
                i--
                x++;
            }
        }

        let embed = new MessageEmbed()
            .setDescription(description)
            .setColor('BLACK')
            .setFooter({
                text: `Toplam ${isimler == null ? 0 : isimler.length} kayıt verisi bulundu.`
            })
        message.reply({ embeds: [embed] })
    }
}



