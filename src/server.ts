import express, { Request, Response, application, NextFunction } from "express";
import { exec } from "child_process";
import { setTimeout } from "timers/promises";

const app = express();
const PORT = parseInt(`${process.env.PORT || 3000}`);
const SIGTERM_SECONDS = parseInt(`${process.env.SIGTERM_SECONDS || 20}`) * 1000;

let saudavel = true
let readTime = new Date(Date.now());
let isRead = () => { 
    return readTime < new Date(Date.now());
};

app.use((req: Request, res: Response, next: NextFunction) => {
    
    if (saudavel) {
        next();
    } else {
        res.statusCode = 500;
        return res.send('');
    }   
});

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.put("/exit/success", (req: Request, res: Response) => {
    res.send("Aplicação encerrada com sucesso.");
    process.exit(0);
});

app.put("/exit/fail", (req: Request, res: Response) => {
    res.send("Aplicação encerrada com sucesso.");
    process.exit(1);
});

app.put("/stress/cpu", (req: Request, res: Response) => {
    exec("stress -c 1k -t 30s");
    res.send("Aplicação em estresse de CPU.");
});

app.get("/health", (req: Request, res: Response) => {
    if (saudavel) {
        res.send("ok");
    } else {
        res.status(500).send("Internal Server Error");
    }
});

app.put("/stress/memory", (req: Request, res: Response) => {
    exec("stress --vm 1 --vm-bytes 1024M -t 30s");
    res.send("Aplicação em estresse de memória.");
});

app.get('/ready', (req: Request, res: Response) => {
   
    if (isRead()) {
        res.statusCode = 200;
        return res.send('Ok');
    } else {
        res.statusCode = 500;
        return res.send('');
    }   
});

app.put('/unhealth', (req: Request, res: Response) => {

    saudavel = false;
    res.send("A aplicação agora está fora.");
});

app.get("/health", (req: Request, res: Response) => {

    res.send("ok");

});

app.put('/unreadfor/:seconds', (req: Request, res: Response) => {
    
    const dado = new Date(new Date(Date.now()).getTime() + (1000 * +req.params.seconds));
    readTime = dado;    
    res.send("A aplicação indisponível por 60 segundos.");
});

process.on('SIGTERM', () => {

    setTimeout(SIGTERM_SECONDS);
    console.log('Encerrando processo');
    process.exit(0);
});

app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
