import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema({
    username: String,
    body: String,
    email: String,
});

export default mongoose.model('User', userSchema);;