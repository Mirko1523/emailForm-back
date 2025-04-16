const db = require('../config/db');
const transporter = require('../services/emailService');

const sendEmail = async (req, res) => {
    const { client, sender_email, receiver_email, subject, content } = req.body;

    try {

        await transporter.sendMail({
            from: sender_email,
            to: receiver_email,
            subject,
            text: content
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
