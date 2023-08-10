require("dotenv").config();
const {STRIPE_SECRET_KEY} = process.env;
const stripe = require('stripe')(STRIPE_SECRET_KEY);

async function pago (req, res){
    const session = await stripe.checkout.sessions.create({
        line_items: [
            ///informacion de productos comprados
        ],
        mode: 'payment',
        succes_url: "succes.html",
        cancel_url: 'cancel.html'
    })
    res.redirect(303, session.url)
}

module.exports = pago;