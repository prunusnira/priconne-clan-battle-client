import React, {Fragment} from 'react';
import './App.css';
import {Route} from 'react-router-dom';

import AppHeader from './PCApp/Header/AppHeader';
import AppFooter from './PCApp/Footer/AppFooter';
import PCIndex from './PCApp/CommonUser/Index/PCIndex';
import Login from './PCApp/CommonUser/Login/Login';
import JoinUser from './PCApp/CommonUser/JoinUser/JoinUser';
import EditUser from './PCApp/CommonUser/EditUser/EditUser';
import ClanList from './PCApp/CommonUser/ClanList/ClanList';

import Error500 from './PCApp/Error/error500';
import Error001 from './PCApp/Error/error001';

import ClanCreate from './PCApp/NonClanMember/ClanCreate/ClanCreate';
import MyDealStatus from './PCApp/ClanMember/MyDealStatus/MyDealStatus';
import ClanDealStatus from './PCApp/ClanMember/ClanDealStatus/ClanDealStatus';

function App() {
    return (
        <Fragment>
            <AppHeader />
            {/* 공통기능 */}
            <Route exact path="/" component={PCIndex} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/join" component={JoinUser} />
            <Route path="/user/edit" component={EditUser} />
            <Route path="/clan/list" component={ClanList} />

            {/* 에러 페이지 */}
            <Route path="/error/500" component={Error500} />
            <Route path="/error/001" component={Error001} />

            {/* 클랜 미가입자 */}
            <Route path="/clan/create" component={ClanCreate} />
            
            {/* 클랜 가입자 */}
            <Route path="/clan/mysheet/:season/:type" component={MyDealStatus} />
            <Route path="/clan/sheet/:season/:type" component={ClanDealStatus} />

            {/* 클랜 관리자 */}
            <AppFooter />
        </Fragment>
    );
}

export default App;