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
    Button
} from 'reactstrap';

interface Props {
    login: boolean
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
                    <Col xs="4">
                        {/* 로그인버튼 */}
                        {
                            (function() {
                                if(self.props.login) {
                                    // 로그인 상태이면 유저 정보를 출력
                                    return (
                                        <Button className="btn-warning" style={{width: "100%"}}>
                                            Logined >>
                                        </Button>
                                    )
                                }
                                else {
                                    // 비로그인 상태이면 로그인 버튼 출력
                                    return (
                                        <Button className="btn-warning" style={{width: "100%"}}
                                            tag={Link} to="/login">
                                            {(textIndex.button.login as any)[self.lang]}
                                        </Button>
                                    )
                                }
                            })()
                        }
                    </Col>
                    <Col xs="4">
                        {/* 딜량표로 이동 */}
                        <Button className="btn-success" style={{width: "100%"}}
                            tag={Link} to="/clan/mysheet/recent/0">
                            {(textIndex.button.dealtable as any)[this.lang]}
                        </Button>
                    </Col>
                    <Col xs="4">
                        {/* 이력서 생성기 */}
                        <Button className="btn-info" style={{width: "100%"}}
                            tag={Link} to="/clan/resume">
                            {(textIndex.button.resume as any)[this.lang]}
                        </Button>
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

export default connect(mapStateToProps)(PCIndex);