const accountSID = "ACc88e975d665ad8609dbee4d0443e5aea";
const authToken = "cf80ffe1a0319bbbc9f947f80ca0967f";
const client = require('twilio')(accountSID, authToken);
const user = require('../controllers/passportLocal');

async function sendMessage(){
    try {
        const message = await client.messages.create({
            from: '+19842234151',
            to: userPhone,
            body
        })
        console.log(message.sid)
        return message;
    } catch (error) {
        console.log(error)
    }
};

async function sendWhatsapp(body, phone){
    try {
        const whatsapp = await client.messages.create({
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+541159777543',
            body
        })
        console.log(whatsapp.sid)
    } catch (error) {
        console.log(error)
    }
};

module.exports = {sendMessage, sendWhatsapp};