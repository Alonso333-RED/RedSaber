import express from "express";
import userRouter from "./src/routes/userRouter.js";
import questionRouter from "./src/routes/questionRouter.js";
import answerRouter from "./src/routes/answerRouter.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`);
});