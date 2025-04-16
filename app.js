const express = require('express');
const dotenv = require('dotenv');
const emailRoutes = require('./routes/emailRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', emailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`📨 Servidor corriendo en http://localhost:${PORT}`);
});
