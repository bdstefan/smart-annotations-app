const mongoose        = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const roles = ['admin', 'user'];

let UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        validate: {
            validator: function(v) {
              return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address.`
        },
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        require: true,
        default: 'user'
    },
    status: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    modified: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

UserSchema.pre('save', function(next) {
    this.increment();
    this.modified = new Date();

    if (this.role == null) {
        this.role = 'user';
    }

    return next();
});

UserSchema.methods.hasRole = (requiredRole) => {
    return this.role == requiredRole;
};


module.exports = mongoose.model('User', UserSchema)