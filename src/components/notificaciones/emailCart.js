import nodemailer from 'nodemailer';

// const emailAdmin = 'gonzalomartinisa@gmail.com'

const emailCart = (obj) => {

  const HTML = `
        <div class="col-6 mx-auto">
            <h2>Se registró un nuevo pedido</h2>
            <h3>Productos</h3>
            ${obj}
        </div>
        `
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
            subject: "Info del pedido",
            html: HTML
        };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
      res.json({ message: 'Error al enviar el mensaje' })
    } else {
      console.log('Email sent: ' + info.response)
      res.json({ message: 'Mensaje Enviado con Éxito!' })
    }
  })
}

export default emailCart;