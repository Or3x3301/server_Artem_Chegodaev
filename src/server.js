const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const ROOT_PATH = path.resolve(__dirname,'..', 'pages');

app.use(express.static(ROOT_PATH));

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});