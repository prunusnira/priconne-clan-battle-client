import express from 'express';
import DBClanBattle from '../db/clanbattle';

const cbRouter = express.Router();

cbRouter.get('/recent', (req: express.Request, res: express.Response) => {
    DBClanBattle.GetCBRecent()
    .then((data) => {
        res.send(data);
    });
});

cbRouter.get('/seasonlist', (req: express.Request, res: express.Response) => {
    DBClanBattle.GetCBList()
    .then((data) => {
        res.send(data);
    });
});

export default cbRouter;