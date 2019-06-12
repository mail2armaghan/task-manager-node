require('../src/db/mongoose');
const User = require('../src/models/user');
// User.findByIdAndUpdate('5cf909a78333d569415e191e', {age : 1}).then(user=>{
//     console.log(user);
//     return User.countDocuments({ age : 1})
// }).then(count=>{
//     console.log(count);
// }).catch(e=>{console.log(e)});


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('5cf9096246ec4f691aaffde0', 2).then(result => {
    console.log(result);
}).catch(e=>console.log(e));
