const accountSID = "ACc88e975d665ad8609dbee4d0443e5aea";
const authToken = "e5e3d403a6873e85fa9f2036c16413f9";
const client = require('twilio')(accountSID, authToken);

async function sendMessage(phone, body){
    try {
        const message = await client.messages.create({
            from: '+19842234151',
            to: phone,
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