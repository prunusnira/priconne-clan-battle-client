import React, {Component, RefObject} from 'react';
import axios from 'axios';
import JoinUserPresenter from './JoinUserPresenter';
import CommonData from '../../../CommonData/commonData';
import textJoinUser from './textJoinUser';
import { RouteComponentProps } from 'react-router';
import Language from '../../../CommonData/language';

import {connect} from 'react-redux';
import {actionCreator, ActionUserInfo} from '../../../Redux/Actions/index';
import {StoreState} from '../../../Redux/Reducer/index';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';

interface IRouterMatchProps {
    token: string
}

interface Props {
    login: boolean,
    TokenActions: typeof actionCreator
}

interface State {
    username: string,
    playerid: string,
    redirectMain: boolean,
    redirectLogin: boolean,
    redirectUserAdd: boolean
}

class JoinUser extends Component<RouteComponentProps<IRouterMatchProps> & Props, State> {
    private nameinp: RefObject<HTMLInputElement> = React.createRef();
    private idinp: RefObject<HTMLInputElement> = React.createRef();
    private lang = Language.getLang();
    
    state: State = {
        username: '',
        playerid: '',

        // Reidrect
        redirectMain: false,
        redirectLogin: false,
        redirectUserAdd: false
    }

    constructor(props: RouteComponentProps<IRouterMatchProps> & Props) {
        super(props);

        this.updateInputVal = this.updateInputVal.bind(this);
    }

    join() {
        const token = this.props.location.state.token;
        const self = this;

        axios.post(CommonData.serverLoginURL+"join", {
            token: token,
            username: this.state.username,
            playerid: this.state.playerid
        })
        .then((res) => {
            if(res.data === 0) {
                // 정상등록
                alert((textJoinUser.joinSuccess as any)[self.lang]);

                // 로그인 설정
                const userinfo: ActionUserInfo = {
                    token: token,
                    id: this.state.playerid,
                    name: this.state.username,
                    playerid: this.state.playerid
                };
                this.props.TokenActions.setLogin(userinfo);

                // 메인으로 보냄
                self.setState({
                    redirectMain: true
                });
            }
            else if(res.data === 1) {
                // 아이디도 등록 실패
                alert((textJoinUser.joinFailAll as any)[self.lang]);
                self.setState({
                    redirectLogin: true
                });
            }
            else if(res.data === 2) {
                // 캐릭터만 등록 실패
                alert((textJoinUser.joinFailChar as any)[self.lang]);
                self.setState({
                    redirectUserAdd: true
                });
            }
        });
    }

    cancel() {
        this.setState({
            redirectMain: true
        });
    }

    updateInputVal(name: string, id: string) {
        const self = this;
        this.setState({
            username: name,
            playerid: id
        }, function() {
            self.join();
        });
    }

    render() {
        return <JoinUserPresenter
                    cancel={this.cancel}
                    nameref={this.nameinp}
                    idref={this.idinp}
                    nameval={this.state.username}
                    idval={this.state.playerid}
                    updateInputVal={this.updateInputVal}
                    redirectMain={this.state.redirectMain}
                    redirectLogin={this.state.redirectLogin}
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinUser);