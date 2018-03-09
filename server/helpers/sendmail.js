const mailgun = require("mailgun-js");

function sendingMail (userEmail, text){
    var api_key = 'key-6cfb3472658d33b40397a14f2f374ef4';
    var DOMAIN = 'sandboxeddc1b47658f41c9aa79ab489a64471c.mailgun.org';
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
  
    var data = {
      from: 'Manja Notifier <alert@manja.com>',
      to: userEmail,
      subject: 'Your Manja lists :)',
      text: text
    };
    
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
  
  }

  module.exports = {sendingMail:sendingMail}