const  jwt = require('jsonwebtoken');

const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
    jwt.sign(
        payload,
        'hiddentoken',  
        {
         expiresIn: "1d",  
        },
        (err, token) => {    
            if (err) reject(err)
            resolve(token);
            
        });
    });
};

module.exports = createAccessToken;