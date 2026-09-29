import express from "express";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import viewRouter from "./src/routes/viewRouter.js";
import userRouter from "./src/routes/userRouter.js";
import questionRouter from "./src/routes/questionRouter.js";
import answerRouter from "./src/routes/answerRouter.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "cambia-esto-por-algo-secreto",
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.currentUser = req.session.user;
    next();
});
app.use(viewRouter);
app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});