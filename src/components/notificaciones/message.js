import twilio from 'twilio';
const accountSID = "ACc88e975d665ad8609dbee4d0443e5aea";
const authToken = "5d183f1e5227ebedcbc0683a2ec9ef25";
const client = twilio(accountSID, authToken);

const sendMessage = async (body) => {
    try {
        const message = await client.messages.create({
            from: '+19842234151',
            to: '+541159777543',
            body: body,
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

export default sendMessage;