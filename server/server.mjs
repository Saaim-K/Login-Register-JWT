import express from 'express'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'


const app = express()
const port = process.env.PORT || 5426
const mongodbURI = process.env.mongodbURI || "mongodb+srv://login-signup:login-signup@cluster0.pu4fwyo.mongodb.net/Login-SignUp?retryWrites=true&w=majority"


app.use(cors())
app.use(express.json());
mongoose.connect(mongodbURI)

// ----------------------------------- MongoDB -----------------------------------
let userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})
const userModel = mongoose.model('Users', userSchema);
// ----------------------------------- MongoDB -----------------------------------


// ----------------------------------- Create User -----------------------------------
app.post('/signup', async (req, res) => {
    try {
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
        const email = req.body.email.toLowerCase();
        userModel.findOne({ email: email }, (error, user) => {
            if (!error) {
                if (user) {
                    console.log("User already exist: ", user);
                    res.status(409).send({
                        message: "User already exists. Please try a different email"
                    });
                    return;
                } else {
                    if (password === confirmpassword) {
                        userModel.create({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            age: req.body.age,
                            email: req.body.email,
                            gender: req.body.gender,
                            phone: req.body.phone,
                            password: req.body.password,
                            confirmpassword: req.body.confirmpassword,
                        })
                        res.status(201).send(
                            `user created`
                        )
                    } else {
                        res.send("Passwords didn't Match")
                    }
                }
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
})
// ----------------------------------- Create User -----------------------------------












////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////


// const __dirname = path.resolve()
// const staticPath = path.join(__dirname, '../client/build')
// console.log("PATH-------",staticPath)
// app.use('/'.express.static(staticPath))
// app.use('*'.express.static(staticPath))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
