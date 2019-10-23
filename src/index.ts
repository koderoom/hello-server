import express from 'express';
import cors from 'cors';
import {CurdManager} from './curd.manager';

const app = express();

// MIDDLEWARE SERVEICE :: ALLOW AJAX CALL
app.use(cors());

// Helps to read the input data in json format.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** WILL DEVELOP API */
app.get("/", async (req, res)=> {
    // const output = {data : 'GET'};
    const output = await CurdManager.read();
    res.json(output);
});

app.post("/", async (req, res)=> {
    const input = req.body;
    // const output = {data : 'POST', todo : input.todo};

    const output = await CurdManager.create(input);
    res.json(output);
});


app.put("/", async (req, res)=> {
    const input = req.body;
    // const output = {data : 'PUT', todo : input.todo}
    const output = await CurdManager.update(input);
    res.json(output);
});

app.delete("/", async (req, res)=> {
    const input = req.body;
    // const output = {data : 'DELETE', todo: input.todo};
    const output = await CurdManager.delete(input);
    res.json(output);
});




app.listen(3000, ()=> {
    console.log('server started');
});