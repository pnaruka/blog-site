import monogoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = monogoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

userSchema.statics.signup = async function(user) {
    //console.log(user);
    if (!user.username ||
        !user.email ||
        !user.password) {
        throw Error('All fields are required!');
    }

    const usernameExists = await this.findOne({ username: user.username }).exec();
    console.log(usernameExists);
    if (usernameExists)
        throw Error('Username taken.');

    if (!validator.isEmail(user.email))
        throw Error('Invalid email');

    if (!validator.isStrongPassword(user.password))
        throw Error('Password not strong enough.');


    const emailExists = await this.findOne({ email: user.email }).exec();
    if (emailExists)
        throw Error('Email already registered.');

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const newUSer = this.create({
        username: user.username,
        email: user.email,
        password: hashPassword
    });

    return newUSer;


}

userSchema.statics.login = async function(user){
    if (!user.username ||
        !user.password) {
        throw Error('All fields are required!');
    }
    const userExists = await this.findOne({ username: user.username }).exec();
    if(!userExists)
    throw Error('User does not exist.');

    const match = await bcrypt.compare(user.password,userExists.password);
    if(!match)
    throw Error('Incorrect password.');

    return userExists;
}

const userModel = monogoose.model('User', userSchema);
export default userModel;