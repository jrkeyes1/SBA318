const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to StyleKey Closet Application!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
};

app.use (requestLogger);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Oh no! Something is broken');
});