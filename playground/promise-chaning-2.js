require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5cf9330b2838cc6f1065a571').then(result=>{
//     console.log(result);
//     return Task.countDocuments({completed:true})
// }).then(count=>{console.log(count)}).catch(e=>console.log(e))


const deleteAndCountObj = async (id, isCompleted) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments(isCompleted);
    return count
}

deleteAndCountObj ('5cf9331f2838cc6f1065a572', true).then(result => {
    console.log(result)
}).catch(e=>{console.log(e)});