const mongoose = require('mongoose');
const validator = require('validator');
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "password"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age should be positive')
            }
        }

    },
    tokens: [{
        token : {
            type: String,
            required: true
        }
    }]
});


//create new function which will return user if email and password match
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Unable to login');
    }
    const isMatch = bycript.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
}

//Generate token on user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id.toString()}, 'itistesting');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

//hash plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified) {
        user.password = bycript.hash(user.password, 8);
    }

    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;