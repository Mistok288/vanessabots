const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const commands = (client.commands = new Discord.Collection());
const aliases = (client.aliases = new Discord.Collection());

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = (message) => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

fs.readdirSync("./commands", { encoding: "utf8" })
  .filter((file) => file.endsWith(".js"))
  .forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name)
      return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`);
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return;
    command.aliases.forEach((otherUses) => {
      aliases.set(otherUses, command.name);
    });
  });

//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on("ready", () => {
  client.user.setPresence({
    activity: { name: "Haypnos ❤️ " },
    status: "idle",
  });
  console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
});
////----------------------- CONFIG KISMI -----------------------\\\\
client.config = {
  vipRoles: ["vipid"], //vip
  unregisteres: ["kayıtsızid"], // kayıtsız
  maleRoles: ["erkekid"], // erkek
  girlroles: ["bayanid"], // bayan
  mods: ["yetkilidi"], // yetkili
  channelID: "kayıtkanalid", // kayıt kanalı
  yönetim: ["üstyetkiliid"], // üst yönetim
};
////----------------------- PREFİX KISMI -----------------------\\\\
client.on("message", (message) => {
  const prefix = "!"; // prefix
  if (
    !message.guild ||
    message.author.bot ||
    !message.content.startsWith(prefix)
  )
    return;
  const args = message.content.slice(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd =
    client.commands.get(command) ||
    client.commands.get(client.aliases.get(command));
  if (!cmd) return;
  cmd.run(client, message, args);
});
////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function (oldUser, newUser) {
  // kod codaredan alınıp editlenmiştir!
  const guildID = "1038505534862671902"; //sunucu
  const roleID = ""; //taglırolü
  const tag = ""; //tag
  const chat = ""; // chat
  const log2 = ""; // log kanalı

  const guild = client.guilds.cache.get(guildID);
  const role = guild.roles.cache.find((roleInfo) => roleInfo.id === roleID);
  const member = guild.members.cache.get(newUser.id);
  const embed = new Discord.MessageEmbed()
    .setAuthor(member.displayName, member.user.avatarURL({ dynamic: true }))
    .setColor("#ff0000")
    .setTimestamp()
    .setFooter("🎄Haypnos");
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
      member.roles.remove(roleID);
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            `<a:lansad:805892284226601021> ${newUser} isminden \`☆\` Üzdün İsiminden ☆ Tagımızı Çıkrarak Ailemizden 1 Efsanevi kişi Eksildi <a:lansad:805892284226601021> !`
          )
        );
    } else if (
      !oldUser.username.includes(tag) &&
      newUser.username.includes(tag)
    ) {
      member.roles.add(roleID);
      client.channels.cache
        .get(chat)
        .send(
          `<a:gloria_totoyladanss:805468289337655306>${newUser} tag alarak ailemize katıldı (${tag})`
        );
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            `<a:lansad:805892284226601021>  ${newUser} ismine \`☆\` alarak ailemize katıldı`
          )
        );
    }
  }
  if (newUser.discriminator !== oldUser.discriminator) {
    if (oldUser.discriminator == "0099" && newUser.discriminator !== "0099") {
      member.roles.remove(roleID);
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            `  <@!' + newUser + '> etiketinden \`0099\` çıakrtarak ailemizden ayrıldı!`
          )
        );
    } else if (
      oldUser.discriminator !== "0099" &&
      newUser.discriminator == "0099"
    ) {
      member.roles.add(roleID);
      client.channels.cache
        .get(log2)
        .send(
          embed.setDescription(
            `  <@!' + newUser + '> etiketine \`0099\` alarak ailemize katıldı`
          )
        );
      client.channels.cache
        .get(chat)
        .send(
          `<a:99_utandm:793369971102580767>Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#0099)`
        );
    }
  }
});

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\

client.on("guildMemberAdd", (member) => {
  const mapping = {
    " ": "",
    0: "", // sayı iDleri
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
  };
  var toplamüye = member.guild.memberCount;
  var emotoplamüye = `${toplamüye}`
    .split("")
    .map((c) => mapping[c] || c)
    .join("");
  let memberDay = Date.now() - member.user.createdTimestamp;
  let createAt = moment
    .duration(memberDay)
    .format("Y [Yıl], M [ay], W [hafta], DD [gün]");
  let createAt2 = moment
    .duration(memberDay)
    .format("DD [gün], HH [saat], mm [dakika]");
  if (memberDay > 604800000) {
    client.channels.cache.get(client.config.channelID)
      .send(`Haypnos sunucu adı girin**  ${member} - \`${member.id}\`

> emoji <#1038507438007136416> Kurallarımızı Okuduktan Sonra İçeri Girebilirsin Herkes Okumuş Sayılır.

> emoji \`\` Birimlere Katılmak İçin Kayıt Olunuz.

> emoji Hesabını< **${createAt}** önce açılmış [Güvenilir] <:cevrim:1052677530215256144>

> emoji Teyit Kanallarından Birine Girip Biraz Beklersen Yetkili Ekibimiz Sana Yardımcı Olmaya Gelecek. <@&>

> <emoji Unutma Ki Tüm Yetkili Ekibimizin Özel Yaşamı Var Onun İçin Senden Sabırlı Olmanı Beklemeni İstemek Zorundayız. 

> emoji  Sunucumuz'da Seninle birlikte \`${emotoplamüye}\` Kişiyiz Dostum Hoşgeldin.

`);
  } else {
    client.channels.cache.get(registerChannel).send(
      new Discord.MessageEmbed()
        .setAuthor(
          member.user.username,
          member.user.avatarURL({ dynamic: true })
        )
        .setDescription(
          `${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Şüpheli!`
        )
        .setTimestamp()
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setFooter(`🎄Haypnos`)
    );
  }
});

////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on("message", (msg) => {
  if (msg.content === ".tag") {
    msg.channel.send(`Haypnos `); // tagı yazınız
  } else if (msg.content === "tag") {
    msg.channel.send(`Haypnos `); // tagı yazınız
  } else if (msg.content === ".tag") {
    msg.channel.send(`Haypnos `); // tagı yazınız
  } else if (msg.content === ".rol-ver") {
    msg.guild.members.cache.forEach((x) => {
      x.roles.add("Haypnos ");
    });
  }
});

client.login(process.env.token); //token

client.on('ready', ()=>{
client.channels.cache.get('seskanalid').join()
})
