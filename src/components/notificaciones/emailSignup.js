import nodemailer from 'nodemailer';

const sendEmailUser = async (user) =>{

    let HTML = `
    <h1>Informacion del usuario</h1>
       <ul>
           <li>Nombre: ${user.firstName}</li>
           <li>Apellido: ${user.lasttName}</li>
           <li>Telefono: ${user.phone}</li>
           <li>Email: ${user.email}</li>
           <li>Password: ${user.password}</li>
       </ul>
    `;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'otho88@ethereal.email',
            pass: 'a1KpJXVXMRuDtvSqVC'
        }
    });

    const mailOptions = {
        from: "Servidor de node.js",
        to: 'otho88@ethereal.email',
        subject: "Info del usuario",
        html: HTML
    };

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log(error)
    };
};

export default sendEmailUser;

