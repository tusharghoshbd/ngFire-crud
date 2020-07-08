import * as functions from 'firebase-functions';
// import * as cors from "cors";
// const corsVar = cors({origin: true})
const cors = require('cors')({
    origin: true
});
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld=functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        // return res.send("Hello from Firebase!");
        res.status(200).send({data: 'Success: Hello from Firebase!'});
    })
});
