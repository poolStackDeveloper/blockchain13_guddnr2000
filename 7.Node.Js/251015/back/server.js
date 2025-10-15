require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require ("./auth/auth.route.js");

app.use(express.urlencoded({ extended: false}));

app.use("/auth", authRouter); //공통 end포인트

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
})
