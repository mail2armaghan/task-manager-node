const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/userRouter');
const taskRouter = require('./routers/taskRouter');
const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//     if(req.method === 'GET')
//     {
//         res.send('Get requests are disabled as of now')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance please try again soon!')
// })

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('server is up on port ' + port);
})

// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const password = 'test!234';
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);
//     const isPassworMatch = await bcrypt.compare(password, hashedPassword);
//     console.log(isPassworMatch);
// }

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    //jwt.sign() takes two arguments first is object which is unique and second is secret string which is used to sign the token
    //As an optional parameter to sign we can pass password expire time as a string
    const token = await jwt.sign({ _id: 'abc123' }, 'itistesting', {expiresIn: '7 days'});
    const isMtach = await jwt.verify(token, 'itistesting');
}

myFunction();