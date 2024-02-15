import mongoose from 'mongoose';

// create collection for sign up and validate it.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
// create model acoording to schema and name the collection. 

const user = mongoose.model('user', userSchema);

export default user;