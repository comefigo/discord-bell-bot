const Discord = require('discord.js');
const client = new Discord.Client();
const INTERVAL_TIME = process.env.INTERVAL_TIME;
const MUSIC_FILE = process.env.MUSIC_FILE;
const TOKEN_ID = process.env.TOKEN_ID;

// target ring channels
const bell_channels = [];

client.on('ready', async () => {
    const channels = client.channels.cache;
    const iterator = channels.entries();
    // make ring channel list
    for (const v of iterator) {
        if (v[1].type == "voice" && v[1].members.size > 0) {
            bell_channels.push(v[1]);
        }
    }
    if (bell_channels.length > 0) {
        (async () => {
            for (const channel of bell_channels) {
                await ring(channel).then(() => {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, INTERVAL_TIME);
                    });
                });
            }
            // logout
            client.destroy();
            process.exit();
        })();
    } else {
        console.log('No voice channel is active.');
        client.destroy();
        process.exit();
    }
    console.log(`Logged in as ${client.user.tag}!`);
});

// join channel and ring the bell
async function ring(channel) {
    return new Promise((resolve, reject) => {
        channel.join().then((conn) => {
            console.log(`Join in ${channel.name}!`);
            // ring the bell
            conn.play(MUSIC_FILE, {
                volume: 0.8,
                fec: true
            }).on('finish', () => {
                console.log('Finished playing!');
                conn.channel.leave();
                return resolve();
            }).on('error', err => {
                console.log(err);
                return reject(err);
            });
        }).catch((err) => {
            console.log(err);
            return reject(err);
        });
    });
}

client.login(TOKEN_ID).catch(() => {
    console.log('faild auth.');
    process.exit();
});