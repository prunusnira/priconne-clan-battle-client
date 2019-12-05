import React, {Component} from 'react';
import textEditUser from './textEditUser';
import Language from '../../../CommonData/language';

import {
    Row,
    Col,
    Container,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';

class EditUser extends Component {
    lang = Language.getLang();
    
    render() {
        return (
            <Container>
                {/* 회원 정보 수정 */}
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                {textEditUser.title[this.lang]}
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="!2">
                                        {textEditUser.sitename[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        <input type="text" className="form-control" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        * {textEditUser.sitenamedesc[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        {textEditUser.gamename[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        <input type="text" className="form-control" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        * {textEditUser.gamenamedesc[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        {textEditUser.id[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        <b>{/* 사용자 게임번호 여기에 표시 */}</b>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        {textEditUser.iddesc[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        {textEditUser.desc1[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        {textEditUser.desc2[this.lang]}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="!2">
                                        {textEditUser.desc3[this.lang]}
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button>
                                    {textEditUser.editbtn[this.lang]}
                                </Button>
                                <Button>
                                    {textEditUser.decline[this.lang]}
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditUser;