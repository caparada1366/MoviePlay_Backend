const nodemailer = require("nodemailer");
require("dotenv").config();
const { CLAVE_MAIL } = process.env;



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: "movieplayhenry@gmail.com",
        pass: CLAVE_MAIL
    }
});

module.exports = transporter;
