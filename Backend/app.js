const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

//Routes
const principalRoutes = require("./routes/principal");
const contactRoutes = require("./routes/contact");

const app = express();
const port = 5173;
const dataBaseUrl =
    "mongodb+srv://luisda1905:mnbvcxz11@cluster0.chxbhvc.mongodb.net/?retryWrites=true&w=majority";
let corsOPtions = {
    origin: "http://127.0.0.1:" + port,
};

const sessionConfig = {
    secret: "fgdfgdgdgjhdvfsgrn3464gfd",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24, secure: true },
};

//App configs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOPtions));
app.use(session(sessionConfig));
app.use(cookieParser());

//Routes
app.use("/", principalRoutes);
app.use("/contact", contactRoutes);

async function main() {
    await mongoose.connect(dataBaseUrl);
}
main().then(() => console.log("Connected to database"));
main().catch((err) => console.log(err));

app.listen(port, () => console.log("Connected on port " + port));
