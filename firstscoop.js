const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const body = 'Hii what is going on, hey just for testing';


// const numbers = ["+919664500754", "+919998424146"];
//
// Promise.all(
//     numbers.map(number => {
//         return twilio.messages.create({
//             to: number,
//             from: process.env.TWILIO_MESSAGING_SERVICE_SID,
//             body: body
//         });
//     })
// )
//     .then(messages => {
//         console.log('Messages sent!');
//     })
//     .catch(err => console.error(err));

const number = "+919726806634"

twilio.messages
    .create({
        to: number,
        from: process.env.TWILIO_NUMBER,
        body: body
    })
    .then(message => {
        console.log(message.sid);
    })
    .catch(err => console.error(err));