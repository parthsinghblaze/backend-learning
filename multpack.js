const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);
const body = 'Hii i am just a test file';

console.log("Hello")

const numbers = ["+919998424146", "+919664500754"];

Promise.all(
    numbers.map(number => {
        return twilio.messages.create({
            to: number,
            from: process.env.TWILIO_MESSAGING_SERVICE_SID,
            body: body
        });
    })
)
    .then(messages => {
        console.log('Messages sent!');
    })
    .catch(err => console.error(err));