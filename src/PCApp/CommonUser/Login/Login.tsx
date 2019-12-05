import React, {Component} from 'react';
import axios from 'axios';
import {sha256} from 'js-sha256';
import CommonData from '../../../CommonData/commonData';
import LoginPresenter from './LoginPresenter';

import {connect} from 'react-redux';
import {actionCreator, ActionUserInfo} from '../../../Redux/Actions/index';
import {StoreState} from '../../../Redux/Reducer/index';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';

interface Props {
    login: boolean,
    userinfo: ActionUserInfo,
    TokenActions: typeof actionCreator
}

interface State {
    redirectMain: boolean,
    redirectJoin: boolean,
    redirectError001: boolean,
    jointoken: string
}

class Login extends Component<Props, State> {
    state: State = {
        redirectMain: false,
        redirectJoin: false,
        redirectError001: false,

        // join params
        jointoken: ""
    }
    
    responseGoogle = (response: any) => {
        const gid = response.getBasicProfile().getEmail().split("@")[0];
        const token = sha256(gid);

        axios.post(CommonData.serverLoginURL+'req', {
            token: token
        })
        .then((res) => {
            // 리턴값에 따라 redirect가 달라짐
            const user = res.data;
            if(user.length > 1) {
                // ERROR - 001: 로그인 정보에 문제가 있음
                this.setState({
                    redirectError001: true
                });
            }
            else if(user.length == 0) {
                // New User: Redirect 필요
                this.setState({
                    redirectJoin: true,
                    jointoken: token
                });
            }
            else {
                // Existing User: 메인으로 보냄
                this.props.TokenActions.setLogin({
                    id: user[0].id,
                    token: user[0].token,
                    name: user[0].sitename,
                    playerid: user[0].playerid
                });
                this.setState({
                    redirectMain: true
                });
            }
        });
    }

    responseFail = (f: any) => {
        console.log(f)
    }

    render() {
        return <LoginPresenter
                    redirectMain={this.state.redirectMain}
                    redirectJoin={this.state.redirectJoin}
                    redirectError001={this.state.redirectError001}
                    jointoken={this.state.jointoken}
                    responseGoogle={this.responseGoogle}
                    responseFail={this.responseFail}
                />
    }
}

const mapStateToProps = (state: StoreState) => ({
    userinfo: state.tokenReducer.userinfo,
    login: state.tokenReducer.login
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    TokenActions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);