import React, {Component, RefObject} from 'react';
import textJoinUser from './textJoinUser';
import Language from '../../../CommonData/language';
import {Redirect} from 'react-router-dom';

import {
    Row,
    Col,
    Button,
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';

interface Props {
    redirectMain: boolean,
    redirectLogin: boolean,
    nameval: string,
    nameref: RefObject<HTMLInputElement>,
    idval: string,
    idref: RefObject<HTMLInputElement>,
    updateInputVal: (e1: string, e2: string) => void,
    cancel: () => void
}

class JoinUserPresenter extends Component<Props> {
    private lang = Language.getLang();

    passInputVal() {
        if(this.props.nameref.current && this.props.idref.current) {
            this.props.updateInputVal(
                this.props.nameref.current.value,
                this.props.idref.current.value
            )
        }
    }

    render() {
        if(this.props.redirectMain) {
            return <Redirect to="/" />
        }
        else if(this.props.redirectLogin) {
            return <Redirect to="/login" />
        }
        /*else if(this.props.redirectUserAdd) {
            return <Redirect to="/" />
        }*/
        else {
            return (
                <Container>
                    {/* 가입을 위한 기본 정보 입력
                        1. 프리코네 닉네임 (홈페이지에서도 표시됨)
                        2. 프리코네 계정 넘버
                    */}
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardHeader>
                                    {(textJoinUser.title as any)[this.lang]}
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12">
                                            {(textJoinUser.username as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <input
                                                type="text"
                                                defaultValue={this.props.nameval}
                                                ref={this.props.nameref}
                                                className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            * {(textJoinUser.namedesc1 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            * {(textJoinUser.namedesc2 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            {(textJoinUser.id as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <input
                                                type="text"
                                                defaultValue={this.props.idval}
                                                ref={this.props.idref}
                                                className="form-control" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            {(textJoinUser.iddesc1 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            {(textJoinUser.iddesc2 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            {(textJoinUser.iddesc3 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            <hr/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            1. {(textJoinUser.desc1 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            2. {(textJoinUser.desc2 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12">
                                            3. {(textJoinUser.desc3 as any)[this.lang]}
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button
                                        onClick={() => this.passInputVal()}>
                                        {(textJoinUser.joinbtn as any)[this.lang]}
                                    </Button>
                                    <Button onClick={this.props.cancel}>
                                        {(textJoinUser.decline as any)[this.lang]}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
}

export default JoinUserPresenter;