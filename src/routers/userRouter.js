const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    //use async await
    try {
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token})
    } catch (e) {
        res.status(400).send(e)
    }
    // below example using then
    // user.save().then(result => {
    //     res.status(201).send(result)
    // }).catch(error => {
    //     res.status(400).send(error);
    // })
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token });
    } catch (e) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth , async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send();
    }
});

router.post('/users/logoutall', auth , async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();

        res.send();
    } catch(e) {
        res.status(500).send()
    }
})


router.get('/users/me', auth , async (req, res) => {
    //user is authenticated and we have set user in req.user
    res.send(req.user);
    
    // try {
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send()
    // }
    // User.find({}).then(users => {
    //     res.send(users);
    // }).catch(error => {
    //     res.status(500).send()
    // })
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send()
        }
        res.send(user);
    } catch (e) {
        res.status(500).send()
    }


    // User.findById(_id).then(user => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        //To use middle ware we need to use differ method so that mongoose should not avoid it as it directly perform operations on db with below query
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        //refactering the code to make use of middleware i.e mongoose schema

        const user = await User.findById(req.params.id);
        updates.forEach(update => user[update] = req.body[update])
        await user.save();
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send()
        }
        res.send(user);

    } catch (e) {
        res.status(500).send()
    }
});

module.exports = router;






