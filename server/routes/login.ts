import express from 'express';
import DBUser from '../db/user';

const loginRouter = express.Router();

// login request
loginRouter.post('/req', (req, res, next) => {
    const token = req.body.token;

    // 서버에 token이 이미 있는상태인지 확인
    DBUser.GetUserAndMainCharByToken(token)
    .then(function(data) {
        if(data !== undefined) {
            // 세션 정보를 전달
            console.log(data);
            res.send(data);
        }
        else {
            // 가입 페이지로 이동
            res.send("");
        }
    });
});

loginRouter.post("/join", (req, res, next) => {
    const token = req.body.token;
    const name = req.body.username;
    const id = req.body.playerid;

    DBUser.CreateUser(name, token, id)
    .then((data) => {
        res.send(data);
    });
});

export default loginRouter;