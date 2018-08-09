const Discord = require('discord.js');
const client = new Discord.Client({
    disableEveryone: true,
})
const litepack = require('./litepack.json');
const bot = new Discord.Collection();


function getRandomInt(min, max) {
    return Math.random() * (max - min) + min;
}

const rstatus = [
    "added >lenny | v1.1.2",
    "added >status | v1.1.3",
    "work >achievement | v1.1.4 soon"
];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (rstatus.length - 1) + 1);
        client.user.setActivity(rstatus[index]);
    }, 5000);
});

client.on('message', async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(litepack.prefix) !== 0) return;
    const args = message.content.slice(litepack.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command === "ping") {
        const m = await message.channel.send(":ping_pong: ?");
        m.edit(`:ping_pong: ! Odpowiedź od serwera wyniosła ${m.createdTimestamp - message.createdTimestamp}ms. Odpowiedź od serwera API wyniosła ${Math.round(client.ping)}ms`);
    }
    if(command === "banana") {
        var banan = Math.floor(getRandomInt(1, 40));
        if (message.author.username === "TheSnapix") {
            banan = 0;
        }
        message.channel.send('Tfuj bananek ma `' + banan + ' cm`', {files: ["https://preview.ibb.co/mCJX0e/bsd.png"]});
    }
    if(command === "say") {
        if(!message.member.roles.some(r=>["AccessB"].includes(r.name)) )
          return message.reply("o f piste brak perm");
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{}); 
        message.channel.send(sayMessage);
    }
    if(command === "clear") {
        if(!message.member.roles.some(r=>["AccessB"].includes(r.name)) )
          return message.reply("o f piste brak perm");
        const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
          return message.reply('Wpisz liczbę pomiędzy `2` a `100` aby usunąć wiadmości');
        
        const fetched = await message.channel.fetchMessages({limit: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`osz ty f piste aj hef błont ${error}`));
    }
    if(command === "kick") {
        if(!message.member.roles.some(r=>["AccessB"].includes(r.name)) )
          return message.reply("o f piste brak perm");
        
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!member)
          return message.reply("oj ty ty. ja z innych serwerów nie kopie ludzi");
        if(!member.kickable) 
          return message.reply("o kuhfa. on ma selfer admina mamo. kup mi tes");
        
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "Brak powodu";
        
        await member.kick(reason)
          .catch(error => message.reply(`kulwa ${message.author} masz tu błynda i spiehtalaj : ${error}`));
        message.reply(`${member.user.tag} został kopnięty przez ${message.author.tag} z powodu: ${reason}`);
    }
    if(command === "sowa") {
        message.channel.send('brak słów do `j.polskiego`', {files: ["https://cdn.discordapp.com/attachments/476666040756207616/476672514802581505/unknown.png"]});
    }
    if(command === "nutle") {
        message.channel.send('to jest właśnie `rudy` człowiek\nnutle siada na `butli` au au\nhttps://www.youtube.com/watch?v=YDoN1rxckR0', {files: ["https://media.discordapp.net/attachments/476666040756207616/476673151871483935/Ep7slLI.png"]});
    }
    if(command === "help") {
        message.author.send(':regional_indicator_p: :regional_indicator_o: :regional_indicator_m: :regional_indicator_o: :regional_indicator_c:\n**Dostępne komendy**\n`>4fun\n>minecraft\n>accessb\n>other`');
    }
    if(command === "4fun") {
        message.author.send(':four: :regional_indicator_f: :regional_indicator_u: :regional_indicator_n:\n**Dostępne komendy**\n`>nutle\n>sowa\n>banana\n>lenny`');
    }
    if(command === "minecraft") {
        message.author.send(':regional_indicator_m: :regional_indicator_i: :regional_indicator_n: :regional_indicator_e: :regional_indicator_c: :regional_indicator_r: :regional_indicator_a: :regional_indicator_f: :regional_indicator_t:\n**Dostępne komendy**\n`>skin\n>hskin`');
    }
    if(command === "other") {
        message.author.send(':o: :regional_indicator_t: :regional_indicator_h: :regional_indicator_e: :regional_indicator_r:\n**Dostępne komendy**\n`brak`');
    }
    if(command === "skin") {
        let skin = args.slice(0).join(' ');
        if(!skin) skin = "ez";

        message.channel.send(`**Skin gracza :** ${skin}`, {files: [`https://mcapi.xdefcon.com/skin/full/${skin}/64.png`]});
    }
    if(command === "hskin") {
        let hskin = args.slice(0).join(' ');
        if(!hskin) hskin = "ez";

        message.channel.send(`**Głowa gracza:** ${hskin}`, {files: [`https://mcapi.xdefcon.com/skin/helm/${hskin}/64.png`]});
    }
    if(command === "accessb") {
        message.author.send(':regional_indicator_a: :regional_indicator_c: :regional_indicator_c: :regional_indicator_e: :regional_indicator_s: :regional_indicator_s: :b:\n**Te komendy są tylko i wyłącznie dla osób z role "AccessB"**\n`>clear\n>kick\n>say`')
    }
    if(command === "lenny") {
        message.channel.send('~~**( ͡° ͜ʖ ͡°)**~~')
    }
    if(command === "serwer") {
        let serwer = args.slice(0).join(' ');
        if(!serwer) serwer = "mc.hypixel.net";
        message.channel.send(`**Informacje o serwerze:** ${serwer}`, {files: [`https://mcapi.us/server/image?ip=${serwer}&theme=dark.png`]});
    }
    if(command === "achievement") {
        let achievement = args.slice(0).join(' ');
        if(!achievement) achievement = "XSGuard"

        message.channel.send(`**Napis będący na odznaczeniu:** ${achievement}`, {files: [`https://cdn.discordapp.com/attachments/474301742268547132/477078244437524480/inventory.png`]});
    }
});


client.login(process.env.BOT_TOKEN)
