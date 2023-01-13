const Discord = require("discord.js");

module.exports = {
  name: 'say',
  aliases: ["sunucu", "bilgi"],
  usage: ".say",
  run: async (client, message, args) => {
  if (!message.guild)
    return message.author.send(
      "Bu Komutu Sadece Sunucularda Kulanabilirsiniz!"
    );
  let güvenlik = ["Zayıf","Orta","Yüsek"]

  const say = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setThumbnail(message.guild.iconURL())
    .setImage(
      "https://share.creavite.co/E2iU9Iu2IthPBT0G.gif"
    )
    .addField(
      "<a:yildiz1:1063084168344506468>  **__Sunucumuzdaki Üye Sayısı__**",
      `\`\`\`${message.guild.memberCount}\`\`\``
    )
    .addField(
      ` **__Sunucumuzdaki Toplam Kanal Ve Kategori Sayısı__**`,
      `  \`\`\`${message.guild.channels.cache.size}\`\`\``
    )
    .addField(
      "<a:yildiz2:1063084578601967667> **__Çevrimiçi üye sayısı__**",
      `» ${
        message.guild.members.cache.filter(
          m => m.user.presence !== "offline"
        ).size
      }`
    )
    .addField(
      "<a:yildiz2:1063084578601967667> **__Sunucumuzdaki Toplam Bot Sayısı__**",
      `» ${message.guild.members.cache.filter(m => m.user.bot).size}`
    )
    .addField(
      `<a:yildiz1:1063084168344506468> **__Sunucumuzdaki Toplam Emoji Sayısı__**`,
      `» **${message.guild.emojis.cache.size}**`
    )
    .addField(
      `<a:yildiz2:1063084578601967667> **__Sunucumuzdaki Toplam Rol Sayısı__**`,
      `» **${message.guild.roles.cache.size}**`
    )
    .addField(`<a:yildiz1:1063084168344506468> **__Sunucumuzdaki Toplam Boost Seviyesi__**`,`**${message.guild.premiumTier}/3**`)
    .addField(
      `<a:yildiz2:1063084578601967667> **__Sunucumuzdaki Toplam Boost Sayısı__**`,
      `» **${message.guild.premiumSubscriptionCount}**`
    )

  message.channel.send({ embeds: [say] });
}
};
