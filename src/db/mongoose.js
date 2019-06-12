const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minLength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('Password can not contain "password"')
//             }
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value))
//             {
//                 throw new Error('Email is not valid')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if(value < 0) {
//                 throw new Error('Age should be positive')
//             }
//         }

//     }   
// });

// const user = new User({
//     name: ' Mike ',
//     age: 27,
//     email: ' test@gmail.com      ',
//     password:'Phone@123!'
// });

// user.save().then(result => {
//     console.log(result);
// }).catch(error => {
//     console.log(error);
// });


// const Tasks = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Tasks({
//     description : '   lunch  ',
//     completed: true
// });

// task.save().then(result => {
//     console.log(result);
// }).catch(error => {
//     console.log(error);
// });