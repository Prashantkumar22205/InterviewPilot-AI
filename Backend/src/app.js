const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express();

app.use(cors({
    origin:"https://interview-pilot-ai-peach.vercel.app",
    // origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())


/* require all the routes here */
const authRouter = require("./routes/auth.route")
const interviewRouter = require("./routes/interview.route")
const googleAuthRoutes = require("./routes/googleAuth.routes");


/* using all the routes here */
app.use("/api/auth",authRouter)
app.use("/auth", googleAuthRoutes);
app.use("/api/interview",interviewRouter)



module.exports = app