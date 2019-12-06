import express from 'express';
import DBMyDeal from '../db/mydeal';

const mydealRouter = express.Router();
mydealRouter.use(express.json());

// 내 딜량 목록에 대한 CRUD
mydealRouter.post('/list', (req: express.Request, res: express.Response) => {
    const playerid = req.body.playerid;
    const season = req.body.season;

    DBMyDeal.GetMyDealList(playerid, season)
    .then((data) => {
        res.send(data);
    });
});

mydealRouter.post('/get', (req: express.Request, res: express.Response) => {
    const playerid = req.body.playerid;
    const season = req.body.season;
    const time = req.body.time;

    DBMyDeal.GetMyDeal(playerid, season, time)
    .then((data) => {
        res.send(data);
    });
});

mydealRouter.post('/add', (req: express.Request, res: express.Response) => {
    const playerid = req.body.playerid;
    const season = req.body.season;
    const day = req.body.day;
    const turn = req.body.turn;
    const bossnum = req.body.bossnum;
    const damage = req.body.damage;
    const time = req.body.time;

    DBMyDeal.AddMyDeal(playerid, season, day, turn, bossnum, damage, time)
    .then((data) => {
        res.sendStatus(200);
    });
});

mydealRouter.post('/edit', (req: express.Request, res: express.Response) => {
    const playerid = req.body.playerid;
    const season = req.body.season;
    const day = req.body.day;
    const turn = req.body.turn;
    const bossnum = req.body.bossnum;
    const damage = req.body.damage;
    const time = req.body.time;

    DBMyDeal.EditMyDeal(playerid, season, day, turn, bossnum, damage, time)
    .then((data) => {
        res.sendStatus(200);
    });
});

mydealRouter.post('/remove', (req: express.Request, res: express.Response) => {
    const playerid = req.body.playerid;
    const season = req.body.season;
    const time = req.body.time;

    DBMyDeal.RemoveMyDeal(playerid, season, time)
    .then((data) => {
        res.sendStatus(200);
    });
});

export default mydealRouter;