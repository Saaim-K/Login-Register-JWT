import express from 'express'
import path from 'path'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import cookieParser from 'cookie-parser';


const app = express()
const port = process.env.PORT || 5426
const mongodbURI = process.env.mongodbURI || "mongodb+srv://login-signup:login-signup@cluster0.pu4fwyo.mongodb.net/Login-SignUp?retryWrites=true&w=majority"
const SECRET = process.env.SECRET || "Thesharedsecretmustbeatleast32bytesinlength";


app.use(express.json())
app.use(cookieParser())
mongoose.connect(mongodbURI)
app.use(cors({
    origin: ['http://localhost:3000', "*"],
    credentials: true
}));


// ----------------------------------- MongoDB -----------------------------------
let userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
})
const userModel = mongoose.model('Users', userSchema);

let productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
    createdOn: { type: Date, default: Date.now }
})
const productModel = mongoose.model('Products', productSchema);
// ----------------------------------- MongoDB -----------------------------------


// ----------------------------------- SignUp -----------------------------------
app.post('/signup', async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password
        userModel.findOne({ email: email }, async (error, user) => {
            if (!error) {
                if (user) {
                    res.status(409).send({
                        message: "User already exists. Please try a different email"
                    });
                    console.log("User already exist with the following email: ", user.email);
                    return;
                } else {
                    const hashPassword = await bcrypt.hash(password, 10)
                    // console.log(hashPassword)
                    userModel.create({
                        name: req.body.name,
                        email: req.body.email,
                        phone: req.body.phone,
                        password: hashPassword,
                    })
                    res.status(201).send(
                        `User Created`
                    )
                    console.log("User Created.")
                }
            }
        })
    } catch (error) {
        res.status(500).send(error)
        console.log("Error While Creating User.")
    }
})
// ----------------------------------- SignUp -----------------------------------


// ----------------------------------- Login -----------------------------------
app.post("/login", (req, res) => {
    try {
        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        userModel.findOne({ email }, async (error, user) => {
            if (!error) {
                if (user) {
                    const isValid = await bcrypt.compare(password, user.password)
                    if (isValid) {
                        const token = jwt.sign({ _id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60) }, SECRET)
                        res.cookie("Token", token, { maxAge: 86_400_000, httpOnly: true })//secure:true for https request only
                        res.status(200).send('User Found')
                        console.log("User Found.", user)
                    } else {
                        res.status(401).send('Wrong Password')
                        console.log("Wrong Password.")
                    }
                } else {
                    res.status(404).send('User not Found')
                    console.log("User not Found.")
                }
            } else {
                res.status(401).send("Login Failed, Please try later");
                console.log("Login Failed, Please try later");
                return;
            }
        })
    } catch (error) {
        res.status(500).send(error)
        console.log("No User Found with the following email: ", email)
    }
})
// ----------------------------------- Login -----------------------------------


// ----------------------------------- Logout -----------------------------------
app.post("/logout", (req, res) => {
    res.cookie('Token', '', { maxAge: 1, httpOnly: true, sameSite: "none", secure: true });
    res.status(200).send('Logged Out')
    console.log("Logged Out.")
})
// ----------------------------------- Logout -----------------------------------


// ----------------------------------- Middleware -----------------------------------
app.use((req, res, next) => {
    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "Include http-only credentials with every request"
        })
        console.log("Include http-only credentials with every request")
        return;
    }
    jwt.verify(req.cookies.Cookies, SECRET, (err, decodedData) => {
        if (!err) {
            console.log("decodedData: ", decodedData);
            const currentTime = new Date().getTime() / 1000;
            if (decodedData.exp < currentTime) {
                res.status(401);
                res.cookie('Token', '', { maxAge: 1, httpOnly: true, sameSite: "none", secure: true });
                res.send({ message: "Token Expired" })
            } else {
                console.log("Token Approved");
                req.body.Cookies = decodedData
                next();
            }
        } else {
            res.status(401).send("Invalid Token")
        }
    });
})
// ----------------------------------- Middleware -----------------------------------


// ----------------------------------- Create/Add Product -----------------------------------
app.post('/product', (req, res) => {
    const body = req.body
    if (!body.name || !body.price) {
        res.status(400).send({
            message: `Required Paramters Missing`
        })
        return;
    }
    productModel.create({
        name: body.name,
        price: body.price,
    },
        (error, uploaded) => {
            if (!error) {
                console.log("Succesfully Uploaded to database", uploaded);
                res.send({
                    message: "Product Added Successfully",
                    data: uploaded
                });
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })
})
// ----------------------------------- Create/Add Product -----------------------------------



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
