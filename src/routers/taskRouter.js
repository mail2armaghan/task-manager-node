const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const tasks = new Task(req.body);
    try {
        const task = await tasks.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send(e)
    }
    // task.save().then(result => {
    //     res.status(201).send(result);
    // }).catch(() => {
    //     res.status(500).send(error);
    // })
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
    // Task.find({}).then(tasks=> {
    //     res.send(tasks)
    // }).catch(() => {
    //     res.status(500).send();
    // })
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }

    // Task.findById(_id).then(task => {
    //     if(!task) {
    //         return res.status(400).send();
    //     }
    //     res.send(task)
    // }).catch(()=>{
    //     res.status(500).send();
    // })

});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["description", "completed"];
    const isValidOperation = updates.every(update => allowUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(404).send({ error: 'Invalid updates!' })
    }

    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const task = await Task.findById(req.params.id);
        updates.forEach(update => task[update]= req.body[update]);
        await task.save();
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).send()
        }
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});


module.exports = router;