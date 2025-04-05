const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: { type: String, required: [true, "Username is required"], unique: [true, "Username is unavailable"] },
    email: { type: String, required: [true, "E-mail address is required"], unique: [true, "A user with that E-mail address already exists"] },
    password: { type: String, required: [true, "A valid password is required"], minlength: 60, maxlength: 60 }, // Used length of 60 to ensure password is hashed before storing
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
},
{
    toJSON: { // toJSON transform function used to return username as id, and omit password from returned JSON object
        transform: (doc, ret) => {
            ret.id = ret.username;
            delete ret._id;
            delete ret.password
        }
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;