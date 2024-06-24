// // Import required packages
// const express = require('express');
// const { v4: uuidv4 } = require('uuid');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const axios = require('axios');
// // 
// const Token = require('./functions');

// const app = express();

// app.use(cors());

// app.use(bodyParser.json());

// app.use('*', (req, res, next) => {
//     try {
//         if(req.originalUrl.toLowerCase().includes('/api')){
//             next()
//         }
//         else {
//             res.status(404).sendFile(__dirname + '/index.html');
//         }
//     }
//     catch {
//         res.status(404).sendFile(__dirname + '/index.html');
//     }
// });

// app.get(`/api`, async (req, res) => {
//     try {
//         let token = "tryit-41033349657-529467d82472af4b3301a051683fcf0a"
//         // 
//         if(token){
//             let fd = new FormData()
//             fd.append('chat_style', `chat`)
//             fd.append('chatHistory', JSON.stringify([{role:"user",content:"hey"}]))

//             let requestOptions = {
//                 method: 'POST',
//                 body: fd,
//                 headers: {
//                     'api-key': token,
//                     // 'origin': 'https://deepai.org',
//                     'referer': 'https://deepai.org/',
//                     // 'cookie': 'user_sees_ads=false',
//                     'user-agent': req.headers['user-agent']
//                 }
//             };

//             let ax = await fetch(`https://api.deepai.org/hacking_is_a_serious_crime`, requestOptions);

//             let responseHeaders = {};
//             ax.headers.forEach((value, name) => {
//                 responseHeaders[name] = value;
//             });

//             res.send({
//                 data: await ax.json(),
//                 txt: responseHeaders,
//             });            
//         }
//         else {
//             res.status(404).sendFile(__dirname + '/index.html');
//         }
//     }
//     catch (e) {
//         console.log(e)
//         res.status(404).sendFile(__dirname + '/index.html');
//     }
// })

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {});


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const uuid = require(`uuid`);
const CryptoJS = require(`crypto-js`);
const axios = require(`axios`);
const cheerio = require('cheerio');
const { marked } = require('marked');

// 
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { RND } = require("./UsersCookies");
const { getAPIKEY } = require("./DeepApi");

let DefaultKey = `3bRJP7BTmzQNSm9LNKIKiJxRdHPSmnTsCRrYHXttMQQyaiDYQ1ldJwDDWOVHri7PS7hU1yUru3it3iWvXtqQccIGYS`

app.use(express());
app.use(
    cors({
        origin: '*',
    })
);

app.use(bodyParser.json({ limit: '1000tb' }));
app.use(bodyParser.urlencoded({ limit: '1000tb', extended: true }))

let Random = (type, size = { from: 0, to: 6 }, isall, mix) => {
    try {
        if (isall) {
            return `${uuid.v4().split('-').join('').toUpperCase()}${uuid.v4().split('-').join('').toUpperCase()}`
        } else {
            let uid = `${uuid.v4().split('-').join('').toUpperCase()}${uuid.v4().split('-').join('').toUpperCase()}${uuid.v4().split('-').join('').toUpperCase()}${uuid.v4().split('-').join('').toUpperCase()}${uuid.v4().split('-').join('').toUpperCase()}`.split('')
            const rgix = /^\d+$/;
            // 
            let flt = uid.filter(v => mix ? true : type ? !v.match(rgix) : v.match(rgix))
            if (flt.length > 0) {
                let st = flt.sort(() => Math.random() - .5)
                return st.splice(size.from, size.to).join('')
            } else {
                return null
            }
        }
    } catch {
        return null
    }
}

let Headers = (added, rnd) => {
    try {
        let haders = {
            'User-Agent': rnd ? rnd : `Mozilla/5.0 (Windows NT 10.0; Mac${Random(null, { from: 0, to: 3 })}; x64) AppleWebKit/${Random(null, { from: 0, to: 4 })}.36 (KHTML, like Gecko) Chrome/${Random(null, { from: 0, to: 3 })}.0.0.0 Safari/${Random(null, { from: 0, to: 2 })}.36 Edg/${Random(null, { from: 0, to: 2 })}.0.${Random(null, { from: 0, to: 2 })}.43`,
            ...added
        }
        return haders
    } catch {
        return {}
    }
}

//

let Destroy = (req, res, isend, status, message) => {
    try {
        if (isend) {
            res.status(status).send(message);
        } else {
            req.destroy()
            res.destroy()
        }
    } catch {
        Destroy(req, res)
    }
}

let DEEPAI = async(req, res, prompt) => {
    try {
        let gna = getAPIKEY(Random(null, { from: 0, to: 2 }))

        let headers = {
            'Referer': 'https://deepai.org/',
            'Origin': 'https://deepai.org',
            'Cookie': RND.user(),
            'Api-Key': gna.f,
            // 'X-Forwarded-For': `${Random(null, { from: 0, to: 2 })}.${Random(null, { from: 0, to: 2 })}.${Random(null, { from: 0, to: 2 })}.${Random(null, { from: 0, to: 2 })}`,
        }

        let formData = new FormData();
        formData.append('chat_style', `chat`);
        formData.append('chatHistory', JSON.stringify([{ role: "user", content: prompt }]))
            // formData.append('text', prompt ? `${prompt}` : `A beautiful woman`);
            // formData.append('image_generator_version', `hd`);
            // 
        let gn = await fetch(`https://api.deepai.org/hacking_is_a_serious_crime`, { method: 'POST', body: formData, headers: Headers(headers, gna.windowAgent), credentials: 'include' })
        let d = await gn.text()

        // Step 1: Define the array of objects
        let wordsToReplace = [
            { word: "Meta AI", replacement: "Medzy AI" },
            { word: "OpenAI", replacement: "MedzyAI" },
            { word: "Open AI", replacement: "Medzy AI" },
            { word: "ChatGPT", replacement: "Medzy AI" },
            { word: "GPT", replacement: "Medzy" },
            { word: "LLaMA", replacement: "Medzy" },
        ];

        // Step 2: Create a regex pattern
        let regexPattern = new RegExp(wordsToReplace.map(item => item.word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|'), 'gi');

        // Step 3: Replace words in a given string
        let inputString = d;
        let replacements = Object.fromEntries(wordsToReplace.map(item => [item.word.toLowerCase(), item.replacement]));

        let resultString = inputString.replace(regexPattern, (matched) => replacements[matched.toLowerCase()]);
        let formatRegex = /(\n|\r\n|\r|\s{2,})/g;
        let formatReplace = {
            '\n': '<br>',
            '\r\n': '<br>',
            '\r': '<br>',
            '  ': '&nbsp;&nbsp;',
            '<script>': '&lt;script&gt;',
            '</script>': '&lt;/script&gt;',
            '<img>': '&lt;img&gt;',
            // Add more tags as needed
        }

        resultString = resultString.replace(formatRegex, (matched) => formatReplace[matched])
            // resultString = resultString.split('script').join('_script_').split('img').join('_img_').split('video').join('_video_').split('iframe').join('_iframe_')
        let sendD = () => {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>AI CHAT RESULT</title>
                    <script src="https://cdn.tailwindcss.com" defer></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.1/purify.min.js"></script>
                </head>
                <body class="bg-gray-100 p-4">
                    <div class="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
                        <h1 class="text-2xl font-bold mb-4">AI CHAT RESULT</h1>
                        <p><strong>Probability:</strong> ${Math.random() * 2 - 1}</p>
                        <p><strong>Response Time:</strong> ${Math.floor(Math.random() * 10000)}ms</p>
                        <p class="dt p-2 bg-dark">${resultString}</p>
                    </div>
                </body>
                </html>
            `);
        }

        if (req.query.hasOwnProperty('sound')) {
            sendD()
                // const response = await axios.get('https://speechgen.io/en/child-tts/', {
                //     headers: {
                //         'referrer': 'https://speechgen.io/',
                //     }
                // });

            // let cookies = response.headers['set-cookie'];

            // if (cookies) {
            //     let fnCN = async (cook) => {
            //         try {
            //             let kook = cook.join('; ').replace(/\s+/g, '').replace(/path=\//g, '');
            //     let obj = {
            //         "lang": "en-US",
            //         "voice": "Holly",
            //         "emotion": "0",
            //         "speed": "1.0",
            //         "format": "mp3",
            //         "pp": "400",
            //         "ps": "300",
            //         "hz": "48000",
            //         "speed_type": 1,
            //         "text": `${resultString}`,
            //         "captcha_value": "",
            //         "vocabulary": false,
            //         "popup_cptch": 0
            //     };
            //     let fm = new FormData();
            //     fm.append('param', JSON.stringify(obj));

            //     let h = Headers({
            //         'referrer': 'https://speechgen.io/en/child-tts/',
            //         'cookie': `${kook}`,
            //         // 'origin': `https://speechgen.io`,
            //     }, gna.windowAgent)

            //     await new Promise(resolve => setTimeout(resolve, 4000));  // Adding delay of 2 seconds

            //     let ft = await fetch('https://speechgen.io/index.php?r=tts/TextToMp3Add&lang=en', {
            //         method: 'POST',
            //         body: fm,
            //         headers: h
            //     });
            //     let fd = await ft.json()

            //     if(fd.status < 1){
            //         fnCN(cook)
            //     }
            //     else {


            //         if(fd.error === ''){
            //             let getU = await fetch(`https://speechgen.io/index.php?r=site/LoadPlayer&id=${fd.prj_id}&lang=en`, {
            //                 method: 'GET',
            //                 headers: h
            //             })
            //             res.send(await getU.text())
            //             // res.send(await getU.text())
            //             // let gf = await fetch(`https://speechgen.io/texttomp3/20240612/p_${fd.prj_id}_497.mp3`, {
            //             //     method: 'GET',
            //             //     headers: h
            //             // })

            //             // let rsp = await gf.text()
            //             // res.send(rsp)
            //         }
            //         else {
            //             res.send({
            //                 status: 200,
            //                 probability: Math.random() * 2 - 1,
            //                 response_time: `${Math.floor(Math.random() * 10000)}ms`,
            //                 response: `${resultString}`,
            //                 error: `Unable to create voice`
            //             });
            //         }
            //     }
            //     // res.send({ data: await ft.json(), headers: h, fm });
            //         }
            //         catch (e) {
            //             console.log(e)
            //             res.send({
            //                 status: 200,
            //                 probability: Math.random() * 2 - 1,
            //                 response_time: `${Math.floor(Math.random() * 10000)}ms`,
            //                 response: `${resultString}`,
            //                 error: `Unable to create voice`
            //             });
            //         }
            //     }

            //     // fnCN(cookies)
            //     res.send({
            //         status: 200,
            //         probability: Math.random() * 2 - 1,
            //         response_time: `${Math.floor(Math.random() * 10000)}ms`,
            //         response: `${resultString}`,
            //         error: `Voice is not available right now.`
            //     });
            // }

            // else {
            //     res.send({
            //         status: 200,
            //         probability: Math.random() * 2 - 1,
            //         response_time: `${Math.floor(Math.random() * 10000)}ms`,
            //         response: `${resultString}`,
            //         error: `Unable to create voice`
            //     });
            // }

        } else {
            sendD()
        }



        // // 
        // let gimg = await axios.get(`${d.output_url}`, { headers: Headers(headers, gna.windowAgent), responseType: `arraybuffer` })
        // let buf = new Buffer.from(gimg.data)
        // // 
        // res.setHeader('Content-Type', 'image/png')
        // res.send(buf)
    } catch (e) {
        // console.log(e)
        // setTimeout(() => { 
        //     DEEPAI()
        // }, 2000)
        console.log(e)
        Destroy(req, res, true, 401, `Something went wrong.`)
    }
}

app.use(`*`, async(req, res, next) => {
    try {
        let params = Object.values(req.params)
        if (params && params.length > 0) {
            if (params[0] = '/' || params[0].includes('/image') && req.query.prompt.trim().length > 0) {
                DEEPAI(req, res, req.query.prompt)
            } else {
                Destroy(req, res, true, 404, `Something went wrong.`)
            }
        } else {
            console.log('error')
            Destroy(req, res, true, 404, `Something went wrong.`)
        }
    } catch (er) {
        console.log(er)
        Destroy(req, res, true, 503, `${er}`)
    }
});


app.listen(3000, () => {
    console.log(`Listening`)
})