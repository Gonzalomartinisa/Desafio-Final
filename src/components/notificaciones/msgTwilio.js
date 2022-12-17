import twilio from 'twilio';
const accountSID = "ACc88e975d665ad8609dbee4d0443e5aea";
const authToken = "4e4b01fb9d207292e8fbae31a90b4618";
const client = twilio(accountSID, authToken);

const sendMessage = async (obj) => {
    try {
        const sms = {
            body: obj.body,
            from: obj.from,
            to: obj.number
          }
        const message = await client.messages.create(sms);
        // console.log(sms)
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