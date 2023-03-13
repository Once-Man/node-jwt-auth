const express = require('express'); 
const doenv = require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`DB is connected at ${DB_URL}`);
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', authRoutes);

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on ${PORT}`);
});

