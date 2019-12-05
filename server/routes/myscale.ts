import express from 'express';
import DBScale from '../db/myscale';

const dealTableRouter = express.Router();
dealTableRouter.use(express.json());

// 스케일 받아오기
dealTableRouter.post('/list', (req: express.Request, res: express.Response) => {
    const token = req.body.token;
    const season = req.body.season;

    // DB에서 가져오기
    DBScale.GetScaleTable(token, season)
    .then((data) => {
        res.send(data);
    });
});

dealTableRouter.post('/update', (req: express.Request, res: express.Response) => {
    const token = req.body.token;
    const season = req.body.season;
    const scale = req.body.scale as Array<number>;

    DBScale.ScaleUpdate(token, season, scale)
    .then((data) => {
        // no data will be returned
        res.send('ok');
    });
});

export default dealTableRouter;