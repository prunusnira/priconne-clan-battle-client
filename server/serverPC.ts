import express from 'express';
import path from 'path';
import passport from 'passport';
import * as googleLogin from 'passport-google-oauth20';
import CommonData from './commondata';
import cors from 'cors';

// router setting
import loginRouter from './routes/login';
import dealTableRouter from './routes/myscale';
import mydealRouter from './routes/mydeal';
import cbRouter from './routes/clanbattle';

const app = express();
const googleStrategy = googleLogin.Strategy;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/login', loginRouter);
app.use('/data/scale', dealTableRouter);
app.use('/data/deal', mydealRouter);
app.use('/data/cb', cbRouter);

// Google Login을 위한 Strategy 설정
passport.use(new googleStrategy({
    clientID: CommonData.GoogleClientID,
    clientSecret: CommonData.GoogleClientSecret,
    callbackURL: "http://test.nira.one:8080/oauth/callback"
},
(accessToken, refreshToken, profile, cb) => {
    // 여기서 추가 설정
    console.log("passport-use");
    process.nextTick(function() {
        return cb(null, profile);
    });
}));

// 인증된 계정에 대한 세션 관리

// 세션에 로그인 정보를 저장 (req.session.passport.user)
passport.serializeUser((user, cb) => {
    cb(null, user);
});

// 서버에 들어오는 요청마다 유저 정보를 전달 (req.user)
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

app.get('/oauth', (req: express.Request, res: express.Response) => {
    console.log("oauth request");
    console.log(res);
    
    passport.authenticate('google', {
        scope: ['email']
    })
});

app.get('/oauth/callback', (req: express.Request, res: express.Response) => {
    console.log("oauth callback request");
    console.log(res);
    passport.authenticate('google', {
        failureRedirect: '/oauth'
    }),
    function(req, res) {
        res.redirect('/');
    }
});

app.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8082);