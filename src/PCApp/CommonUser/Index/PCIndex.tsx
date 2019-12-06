import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import textIndex from './textIndex';
import Language from '../../../CommonData/language';

import {connect} from 'react-redux';
import {StoreState} from '../../../Redux/Reducer/index';

import {
    Container,
    Row,
    Col,
    Button,
    Jumbotron
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faSignInAlt, faThList, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { actionCreator } from '../../../Redux/Actions';

interface Props {
    login: boolean,
    TokenActions: typeof actionCreator
}

interface State {
    search: string
}

class PCIndex extends Component<Props> {
    private lang = Language.getLang();

    render() {
        const self = this;
        return (
            <Container>
                {/* 메인페이지에 보일 내용
                1. 클랜전 정보
                2. 등록 클랜 목록 */}

                <Row>
                    <Col xs="12" className="btn-group">
                        {/* 로그인버튼 */}
                        {
                            (function() {
                                if(self.props.login) {
                                    // 로그인 상태이면 유저 정보를 출력
                                    return (
                                        <Button className="btn-warning" style={{width: "100%"}}
                                            onClick={() => self.props.TokenActions.setLogout()}>
                                            {(textIndex.button.logout as any)[self.lang]}<br/>
                                            <FontAwesomeIcon icon={faSignOutAlt} size="8x" />
                                        </Button>
                                    )
                                }
                                else {
                                    // 비로그인 상태이면 로그인 버튼 출력
                                    return (
                                        <Button className="btn-warning" style={{width: "100%"}}
                                            tag={Link} to="/user/login">
                                            {(textIndex.button.login as any)[self.lang]}<br/>
                                            <FontAwesomeIcon icon={faSignInAlt} size="8x" />
                                        </Button>
                                    )
                                }
                            })()
                        }
                        {/* 딜량표로 이동 */}
                        <Button className="btn-success" style={{width: "100%"}}
                            tag={Link} to="/clan/mysheet/recent/0">
                            {(textIndex.button.dealtable as any)[this.lang]}<br/>
                            <FontAwesomeIcon icon={faThList} size="8x" />
                        </Button>
                        {/* 이력서 생성기 */}
                        <Button className="btn-info" style={{width: "100%"}}
                            onClick={() => alert("준비중입니다")}>
                            {/*tag={Link} to="/clan/resume">*/}
                            {(textIndex.button.resume as any)[this.lang]}<br/>
                            <FontAwesomeIcon icon={faFileAlt} size="8x" />
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12">
                        <Jumbotron>
                            <h3>{(textIndex.alpha as any)[this.lang]}</h3>
                        </Jumbotron>
                    </Col>
                </Row>

                <Row style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    <Col xs="12">
                        <h3>{(textIndex.title as any)[this.lang]}</h3>
                    </Col>
                    <Col xs="12">
                        {(textIndex.about1 as any)[this.lang]}<br/>
                        {(textIndex.about2 as any)[this.lang]}<br/>
                        {(textIndex.about3 as any)[this.lang]}<br/>
                        {(textIndex.about4 as any)[this.lang]}<br/>
                    </Col>
                </Row>

                <Row style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    <Col xs="12">
                        <h3>{(textIndex.working as any)[this.lang]}</h3>
                    </Col>
                    <Col xs="12">
                        {(textIndex.wo1 as any)[this.lang]}<br/>
                        {(textIndex.wo2 as any)[this.lang]}<br/>
                        {(textIndex.wo3 as any)[this.lang]}<br/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: StoreState) => ({
    userinfo: state.tokenReducer.userinfo,
    login: state.tokenReducer.login
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
    TokenActions: bindActionCreators(actionCreator, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PCIndex);