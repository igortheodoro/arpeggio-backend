const express = require('express'),
    app = express(),
    axios = require("axios").default,
    fs = require('fs');

app.use(express.json())

app.post('/', function (req, res) {
    let toMail = 'igortheodoro12@gmail.com';
    let ccToMail = 'igortheodoro15@gmail.com';

    let replyEmail = req.body.email;
    let content = req.body.content;
    let name = req.body.name;

    let apiKey = fs.readFileSync('key.txt', 'utf8');

    let options = {
        method: 'POST',
        url: 'https://email-sender1.p.rapidapi.com/',
        params: {
            txt_msg: `${content}`,
            to: `${toMail}`,
            from: `${name}`,
            subject: 'Arpeggio - Solicitação de orçamento',
            bcc: null,
            reply_to: `${replyEmail}`,
            html_msg: `<html><body>
            <table cellpadding="0" cellspacing="0"
            style="color: rgb(51, 51, 51); max-width: 685px; 
            padding: 0px 20px; margin: 38px auto 0px;">
            <p style="font-size:17px;"><b>${content}</b></p>
            </table></body></html>`,
            cc: `${ccToMail}`
        },
        headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'email-sender1.p.rapidapi.com',
            'x-rapidapi-key': apiKey.toString()
        },
        data: { key1: 'value', key2: 'value' }
    };

    axios.request(options).then(function (response) {
        res.sendStatus(200);
    }).catch(function (error) {
        console.log(error)
        res.sendStatus(500);
    });
})

app.get('*', function (req, res) {
    res.sendStatus(404);
});

app.listen({ port: process.env.PORT || 8000 });