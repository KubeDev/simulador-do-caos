import express, { Request, Response, application } from "express";
import { exec } from "child_process";
const app = express();
const PORT = parseInt(`${process.env.PORT || 3000}`);

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

app.get("/exit/success", (req: Request, res: Response) => {
    process.exit(0);
});

app.get("/exit/fail", (req: Request, res: Response) => {
    process.exit(1);
});

app.get("/stress/cpu", (req: Request, res: Response) => {
    exec("stress -c 1k -t 30s");
    res.send("ok")
});

app.get("/stress/memory", (req: Request, res: Response) => {
    res.send("ok")
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));