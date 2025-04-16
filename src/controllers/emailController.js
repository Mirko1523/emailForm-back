const db = require('../config/db');
const transporter = require('../services/emailService');

const sendEmail = async (req, res) => {
    const { client, sender_email, receiver_email, subject, content } = req.body;

    try {
        await transporter.sendMail({
            from: `"Formulario Web de ${client}" <${process.env.EMAIL_USER}>`,
            to: receiver_email,
            subject,
            text: `📩 Nuevo mensaje de ${client}

Email del remitente: ${sender_email}

Mensaje:
${content}
`,
            replyTo: sender_email
        });



        await db.execute(
            `INSERT INTO emails (client, sender_email, receiver_email, subject, content, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
            [client, sender_email, receiver_email, subject, content, 'received']
        );

        res.status(200).json({ message: 'Correo enviado y registrado ✅' });
    } catch (error) {
        console.error('Error al enviar/guardar:', error);
        res.status(500).json({ error: 'Ocurrió un error al procesar el correo' });
    }
};

module.exports = { sendEmail };
