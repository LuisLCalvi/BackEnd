require('dotenv').config()

 const { createTransport } = require("nodemailer")

 const mail = {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASS_ADMIN
}
 const transporter = createTransport({
     host: 'gmail',
     port: 587,
     auth: {
        user: mail.user,
        pass: mail.pass
     }
 });

  async function sendEmail(email, name){
     try {
         await transporter.sendMail({
             from:  mail.user,
             to: email,
             subject: 'Mail de prueba node.js',
             text: 'Te doy la bienvenida',
             html: `<head>
             <link rel="stylesheet" href="../public/estilos.css">
             </head>
      
             <div id="email___content">
             <h2>Hola ${name}</h2>
             <p>Felicidades!!</p>
             <p>Te has registrado de manera exitosa</p>
             </div>`
            })

     } catch (error) {
         console.log('Algo salio mal ', error);

     }

 }

 async function sendOrderMail(email){
    try{
        await transporter.sendMail({
            from: "Muchas gracias por su compra",
            to: user.username,
            subject: 'Nuevo pedido',
            html: `<head>
            <link rel="stylesheet" href="./style.css">
            </head>
       
            <div id="email___content">
            <h2>Hola ${email}</h2>
            <p>Felicidades!!</p>
            <p>Haz realizado tu primera compra</p>
            </div>`
        })
    }catch(error){
        console.log('Algo salio mal', error)
    }
}

 module.exports = {sendEmail, sendOrderMail}